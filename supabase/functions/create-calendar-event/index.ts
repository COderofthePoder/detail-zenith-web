import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Build a JWT from the service-account JSON key and exchange it for an access token
async function getAccessToken(serviceAccountKey: string): Promise<string> {
  const sa = JSON.parse(serviceAccountKey);

  const header = { alg: "RS256", typ: "JWT" };
  const now = Math.floor(Date.now() / 1000);
  const claimSet = {
    iss: sa.client_email,
    scope: "https://www.googleapis.com/auth/calendar.events",
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  };

  const enc = (obj: unknown) =>
    btoa(JSON.stringify(obj))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

  const unsignedToken = `${enc(header)}.${enc(claimSet)}`;

  // Import the RSA private key
  const pemBody = sa.private_key
    .replace(/-----BEGIN PRIVATE KEY-----/, "")
    .replace(/-----END PRIVATE KEY-----/, "")
    .replace(/\s/g, "");

  const binaryKey = Uint8Array.from(atob(pemBody), (c) => c.charCodeAt(0));

  const cryptoKey = await crypto.subtle.importKey(
    "pkcs8",
    binaryKey,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    cryptoKey,
    new TextEncoder().encode(unsignedToken)
  );

  const sig = btoa(String.fromCharCode(...new Uint8Array(signature)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  const jwt = `${unsignedToken}.${sig}`;

  // Exchange JWT for access token
  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });

  if (!tokenRes.ok) {
    const err = await tokenRes.text();
    throw new Error(`Token exchange failed [${tokenRes.status}]: ${err}`);
  }

  const { access_token } = await tokenRes.json();
  return access_token;
}

interface CalendarEventRequest {
  summary: string;
  description: string;
  date: string; // ISO date string e.g. "2025-03-15"
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const GOOGLE_SERVICE_ACCOUNT_KEY = Deno.env.get("GOOGLE_SERVICE_ACCOUNT_KEY");
    if (!GOOGLE_SERVICE_ACCOUNT_KEY) {
      throw new Error("GOOGLE_SERVICE_ACCOUNT_KEY is not configured");
    }

    const GOOGLE_CALENDAR_ID = Deno.env.get("GOOGLE_CALENDAR_ID");
    if (!GOOGLE_CALENDAR_ID) {
      throw new Error("GOOGLE_CALENDAR_ID is not configured");
    }

    const body: CalendarEventRequest = await req.json();
    const { summary, description, date, customerName, customerEmail, customerPhone } = body;

    if (!summary || !date || !customerName) {
      throw new Error("Missing required fields: summary, date, customerName");
    }

    const accessToken = await getAccessToken(GOOGLE_SERVICE_ACCOUNT_KEY);

    // Create an all-day event on the requested date
    const event = {
      summary,
      description: [
        description,
        "",
        `Kunde: ${customerName}`,
        `E-Mail: ${customerEmail}`,
        customerPhone ? `Telefon: ${customerPhone}` : "",
      ]
        .filter(Boolean)
        .join("\n"),
      start: { date }, // all-day event
      end: { date },   // same day
      reminders: { useDefault: true },
    };

    const calendarUrl = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
      GOOGLE_CALENDAR_ID
    )}/events`;

    const calRes = await fetch(calendarUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    });

    if (!calRes.ok) {
      const err = await calRes.text();
      throw new Error(`Google Calendar API failed [${calRes.status}]: ${err}`);
    }

    const calData = await calRes.json();
    console.log("Calendar event created:", calData.id);

    return new Response(
      JSON.stringify({ success: true, eventId: calData.id }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: unknown) {
    console.error("Error creating calendar event:", error);
    const msg = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ success: false, error: msg }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
});
