import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

// In-memory rate limiting (per instance)
// For production, consider using a database or Redis
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 3600000; // 1 hour
const RATE_LIMIT_MAX_REQUESTS = 5; // Max 5 requests per IP per hour

function checkRateLimit(ip: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  
  // Clean up old entries periodically
  if (rateLimitMap.size > 10000) {
    for (const [key, value] of rateLimitMap.entries()) {
      if (value.resetTime < now) {
        rateLimitMap.delete(key);
      }
    }
  }
  
  if (!record || record.resetTime < now) {
    // New window or expired window
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true };
  }
  
  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    const retryAfter = Math.ceil((record.resetTime - now) / 1000);
    return { allowed: false, retryAfter };
  }
  
  record.count++;
  return { allowed: true };
}

// HTML escape function to prevent XSS attacks
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

// Simple email format validation
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Honeypot check - if this field is filled, it's likely a bot
function isHoneypotTriggered(body: Record<string, unknown>): boolean {
  return !!(body.website || body.url || body.company_website);
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get client IP for rate limiting
    const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
                     req.headers.get('x-real-ip') || 
                     'unknown';
    
    // Check rate limit
    const { allowed, retryAfter } = checkRateLimit(clientIp);
    if (!allowed) {
      console.log(`Rate limit exceeded for IP: ${clientIp}`);
      return new Response(
        JSON.stringify({ 
          error: "Zu viele Anfragen. Bitte versuchen Sie es später erneut.",
          retryAfter 
        }),
        {
          status: 429,
          headers: { 
            "Content-Type": "application/json",
            "Retry-After": String(retryAfter),
            ...corsHeaders 
          },
        }
      );
    }

    const body = await req.json();
    
    // Check honeypot fields
    if (isHoneypotTriggered(body)) {
      console.log("Honeypot triggered, likely bot submission");
      // Return success to not alert the bot, but don't send email
      return new Response(
        JSON.stringify({ success: true }),
        {
          status: 200,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const { name, email, phone, message }: ContactEmailRequest = body;

    // Validate and sanitize inputs
    if (!name || typeof name !== 'string' || name.trim().length === 0 || name.length > 100) {
      throw new Error("Ungültiger Name");
    }
    if (!email || typeof email !== 'string' || email.length > 255 || !isValidEmail(email)) {
      throw new Error("Ungültige E-Mail-Adresse");
    }
    if (!message || typeof message !== 'string' || message.trim().length === 0 || message.length > 5000) {
      throw new Error("Ungültige Nachricht");
    }
    if (phone && (typeof phone !== 'string' || phone.length > 30)) {
      throw new Error("Ungültige Telefonnummer");
    }

    // Escape all user inputs for HTML
    const safeName = escapeHtml(name.trim());
    const safeEmail = escapeHtml(email.trim());
    const safePhone = phone ? escapeHtml(phone.trim()) : null;
    const safeMessage = escapeHtml(message.trim()).replace(/\n/g, '<br>');

    console.log(`Sending contact email from: ${safeEmail} (IP: ${clientIp})`);

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not set");
    }

    // Send email to DS-Detailing
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "DS-Detailing Kontakt <kontakt@ds-detailin.com>",
        to: ["ds.detailing@hotmail.com"],
        reply_to: email,
        subject: `Neue Kontaktanfrage von ${safeName}`,
        html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin: 0; padding: 0; background-color: #000000; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #000000; padding: 32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%;">
        <!-- Logo -->
        <tr><td align="center" style="padding-bottom: 24px;">
          <img src="https://dvnapflludhnncmuakla.supabase.co/storage/v1/object/public/email-assets/logo.png" alt="DS-Detailing" style="max-width: 210px; height: auto;" />
        </td></tr>
        <!-- Main Card -->
        <tr><td>
          <div style="background-color: #2a2a2a; border-radius: 16px; padding: 32px; border: 1px solid #333;">
            <h2 style="color: #f97316; margin: 0 0 20px 0; font-size: 22px; text-align: center;">Neue Kontaktanfrage</h2>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr><td style="padding: 8px 0; color: #999; font-size: 14px; width: 100px;">Name</td><td style="padding: 8px 0; color: #fff; font-size: 14px; font-weight: 600;">${safeName}</td></tr>
              <tr><td style="padding: 8px 0; color: #999; font-size: 14px;">E-Mail</td><td style="padding: 8px 0; color: #fff; font-size: 14px; font-weight: 600;">${safeEmail}</td></tr>
              ${safePhone ? `<tr><td style="padding: 8px 0; color: #999; font-size: 14px;">Telefon</td><td style="padding: 8px 0; color: #fff; font-size: 14px; font-weight: 600;">${safePhone}</td></tr>` : ''}
            </table>
            <div style="margin-top: 20px; border-top: 1px solid #444; padding-top: 20px;">
              <p style="color: #999; font-size: 13px; margin: 0 0 8px 0; text-transform: uppercase; letter-spacing: 1px;">Nachricht</p>
              <p style="color: #e0e0e0; font-size: 15px; line-height: 1.6; margin: 0;">${safeMessage}</p>
            </div>
          </div>
        </td></tr>
        <!-- Footer -->
        <tr><td align="center" style="padding-top: 24px;">
          <p style="color: #666; font-size: 12px; margin: 0;">© DS-Detailing · Premium Auto-Aufbereitung</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>
        `,
      }),
    });

    if (!emailResponse.ok) {
      const error = await emailResponse.text();
      console.error("Error sending email:", error);
      throw new Error(`Failed to send email: ${error}`);
    }

    const emailData = await emailResponse.json();
    console.log("Email sent successfully:", emailData);

    // Send confirmation email to customer
    const confirmationResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "DS-Detailing <kontakt@ds-detailin.com>",
        to: [email],
        subject: "Ihre Anfrage bei DS-Detailing",
        html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin: 0; padding: 0; background-color: #000000; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #000000; padding: 32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%;">
        <!-- Logo -->
        <tr><td align="center" style="padding-bottom: 24px;">
          <img src="https://dvnapflludhnncmuakla.supabase.co/storage/v1/object/public/email-assets/logo.png" alt="DS-Detailing" style="max-width: 210px; height: auto;" />
        </td></tr>
        <!-- Main Card -->
        <tr><td>
          <div style="background-color: #2a2a2a; border-radius: 16px; padding: 32px; border: 1px solid #333;">
            <h2 style="color: #f97316; margin: 0 0 16px 0; font-size: 22px; text-align: center;">Vielen Dank für Ihre Anfrage!</h2>
            <p style="color: #e0e0e0; font-size: 15px; line-height: 1.6; text-align: center; margin: 0 0 20px 0;">
              Hallo ${safeName}, wir haben Ihre Nachricht erhalten und werden uns schnellstmöglich bei Ihnen melden.
            </p>
            <div style="border-top: 1px solid #444; padding-top: 20px; margin-top: 8px;">
              <p style="color: #999; font-size: 13px; margin: 0 0 8px 0; text-transform: uppercase; letter-spacing: 1px;">Ihre Nachricht</p>
              <p style="color: #e0e0e0; font-size: 15px; line-height: 1.6; margin: 0;">${safeMessage}</p>
            </div>
          </div>
        </td></tr>
        <!-- Warning Card -->
        <tr><td style="padding-top: 16px;">
          <div style="background-color: #3a2a00; border-radius: 12px; padding: 20px; border: 1px solid #5a4000;">
            <p style="color: #fbbf24; font-weight: 700; font-size: 14px; margin: 0 0 8px 0;">⚠️ Hinweis zur Terminplanung</p>
            <p style="color: #d4a000; font-size: 13px; line-height: 1.5; margin: 0;">
              Wir reservieren den Slot exklusiv für dich. Absagen/Umplanungen bitte mindestens 24 Stunden vor Terminstart. Bei kurzfristiger Absage oder Nichterscheinen verrechnen wir eine Ausfallpauschale von CHF 100.–.
            </p>
          </div>
        </td></tr>
        <!-- Footer -->
        <tr><td align="center" style="padding-top: 24px;">
          <p style="color: #999; font-size: 14px; margin: 0 0 4px 0;">Mit freundlichen Grüßen<br><strong style="color: #f97316;">Ihr DS-Detailing Team</strong></p>
          <p style="color: #666; font-size: 12px; margin: 12px 0 0 0;">
            📞 +41 76 549 36 97 / +41 79 261 09 98<br>
            ✉️ ds.detailing@hotmail.com
          </p>
          <p style="color: #555; font-size: 11px; margin: 16px 0 0 0;">© DS-Detailing · Premium Auto-Aufbereitung</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>
        `,
      }),
    });

    if (!confirmationResponse.ok) {
      const error = await confirmationResponse.text();
      console.error("Error sending confirmation:", error);
      // Don't throw here, main email was sent successfully
    }

    const confirmationData = confirmationResponse.ok 
      ? await confirmationResponse.json() 
      : null;
    
    console.log("Confirmation email sent:", confirmationData);

    return new Response(
      JSON.stringify({ 
        success: true, 
        emailId: emailData.id,
        confirmationId: confirmationData?.id
      }), 
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
