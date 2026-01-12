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

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, phone, message }: ContactEmailRequest = await req.json();

    // Validate and sanitize inputs
    if (!name || typeof name !== 'string' || name.length > 100) {
      throw new Error("Invalid name");
    }
    if (!email || typeof email !== 'string' || email.length > 255) {
      throw new Error("Invalid email");
    }
    if (!message || typeof message !== 'string' || message.length > 5000) {
      throw new Error("Invalid message");
    }
    if (phone && (typeof phone !== 'string' || phone.length > 30)) {
      throw new Error("Invalid phone");
    }

    // Escape all user inputs for HTML
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = phone ? escapeHtml(phone) : null;
    const safeMessage = escapeHtml(message).replace(/\n/g, '<br>');

    console.log("Sending contact email from:", email);

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
          <h2>Neue Kontaktanfrage</h2>
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>E-Mail:</strong> ${safeEmail}</p>
          ${safePhone ? `<p><strong>Telefon:</strong> ${safePhone}</p>` : ''}
          <h3>Nachricht:</h3>
          <p>${safeMessage}</p>
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
          <h2>Vielen Dank für Ihre Anfrage!</h2>
          <p>Hallo ${safeName},</p>
          <p>wir haben Ihre Nachricht erhalten und werden uns schnellstmöglich bei Ihnen melden.</p>
          <h3>Ihre Nachricht:</h3>
          <p>${safeMessage}</p>
          <br>
          <p>Mit freundlichen Grüßen<br>
          Ihr DS-Detailing Team</p>
          <p style="color: #666; font-size: 12px; margin-top: 20px;">
            DS-Detailing<br>
            Telefon: +41 76 549 36 97 / +41 79 261 09 98<br>
            E-Mail: ds.detailing@hotmail.com
          </p>
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
