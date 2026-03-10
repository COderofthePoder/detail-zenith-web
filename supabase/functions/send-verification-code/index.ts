import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function generateCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
  return text.replace(/[&<>"']/g, m => map[m]);
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("Nicht autorisiert");

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabaseAnon = Deno.env.get("SUPABASE_ANON_KEY")!;

    // Get the authenticated user
    const userClient = createClient(supabaseUrl, supabaseAnon, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: { user }, error: userError } = await userClient.auth.getUser();
    if (userError || !user) throw new Error("Nicht autorisiert");

    const { email, firstName } = await req.json();
    if (!email) throw new Error("E-Mail ist erforderlich");

    const code = generateCode();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString(); // 15 min

    // Use service role to insert verification code
    const adminClient = createClient(supabaseUrl, supabaseServiceKey);

    // Delete any existing codes for this user
    await adminClient.from("email_verifications").delete().eq("user_id", user.id);

    // Insert new code
    const { error: insertError } = await adminClient.from("email_verifications").insert({
      user_id: user.id,
      email,
      code,
      expires_at: expiresAt,
    });
    if (insertError) throw insertError;

    // Send email via Resend
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) throw new Error("RESEND_API_KEY not configured");

    const safeName = firstName ? escapeHtml(firstName) : "Mitglied";

    const emailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "DS Detailing <kontakt@ds-detailin.com>",
        to: [email],
        subject: "Dein Bestätigungscode – DS Detailing",
        html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin: 0; padding: 0; background-color: #000000; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #000000; padding: 32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%;">
        <tr><td align="center" style="padding: 0; margin: 0;">
          <img src="https://dvnapflludhnncmuakla.supabase.co/storage/v1/object/public/email-assets/logo.png" alt="DS Detailing" style="max-width: 160px; height: auto; display: block; margin: 0; padding: 0;" />
        </td></tr>
        <tr><td>
          <div style="background-color: #2a2a2a; border-radius: 16px; padding: 32px; border: 1px solid #333; text-align: center;">
            <h2 style="color: #f97316; margin: 0 0 16px 0; font-size: 22px;">E-Mail Bestätigung</h2>
            <p style="color: #e0e0e0; font-size: 15px; line-height: 1.6; margin: 0 0 24px 0;">
              Hallo ${safeName}, gib den folgenden Code ein, um deine Registrierung abzuschliessen:
            </p>
            <div style="background-color: #1a1a1a; border-radius: 12px; padding: 20px; margin: 0 auto; display: inline-block; border: 2px solid #f97316;">
              <span style="color: #f97316; font-size: 36px; font-weight: 700; letter-spacing: 8px; font-family: 'Courier New', monospace;">${code}</span>
            </div>
            <p style="color: #999; font-size: 13px; margin: 20px 0 0 0;">
              Der Code ist 15 Minuten gültig.
            </p>
          </div>
        </td></tr>
        <tr><td align="center" style="padding-top: 24px;">
          <p style="color: #999; font-size: 14px; margin: 0 0 4px 0;">Mit freundlichen Grüssen<br><strong style="color: #f97316;">Dein DS Detailing Team</strong></p>
          <p style="color: #555; font-size: 11px; margin: 16px 0 0 0;">© DS Detailing · Premium Auto-Aufbereitung</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
      }),
    });

    if (!emailRes.ok) {
      const errText = await emailRes.text();
      console.error("Resend error:", errText);
      throw new Error("E-Mail konnte nicht gesendet werden");
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
});
