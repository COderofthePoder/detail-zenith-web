import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

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

    const { code } = await req.json();
    if (!code || code.length !== 6) throw new Error("Ungültiger Code");

    const adminClient = createClient(supabaseUrl, supabaseServiceKey);

    // Find valid verification code
    const { data: verification, error: fetchError } = await adminClient
      .from("email_verifications")
      .select("*")
      .eq("user_id", user.id)
      .eq("code", code)
      .eq("verified", false)
      .gte("expires_at", new Date().toISOString())
      .maybeSingle();

    if (fetchError) throw fetchError;
    if (!verification) {
      return new Response(
        JSON.stringify({ error: "Ungültiger oder abgelaufener Code." }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Mark as verified
    await adminClient
      .from("email_verifications")
      .update({ verified: true })
      .eq("id", verification.id);

    // Update member as verified
    await adminClient
      .from("members")
      .update({ is_verified: true })
      .eq("user_id", user.id);

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
