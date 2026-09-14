import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const RECIPIENT = "goldst422@gmail.com";
const MAX_LENGTHS = { name: 100, email: 255, subject: 200, message: 5000 };
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function response(body: Record<string, string>, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (request.method !== "POST") return response({ error: "Method not allowed" }, 405);

  try {
    const payload = await request.json();
    const name = typeof payload.name === "string" ? payload.name.trim() : "";
    const email = typeof payload.email === "string" ? payload.email.trim() : "";
    const subject = typeof payload.subject === "string" ? payload.subject.trim() : "";
    const message = typeof payload.message === "string" ? payload.message.trim() : "";

    if (!name || !email || !subject || !message) return response({ error: "All fields are required" }, 400);
    if (Object.entries({ name, email, subject, message }).some(([key, value]) => value.length > MAX_LENGTHS[key as keyof typeof MAX_LENGTHS])) {
      return response({ error: "One or more fields are too long" }, 400);
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return response({ error: "Invalid email address" }, 400);

    const resendKey = Deno.env.get("RESEND_API_KEY");
    if (!resendKey) {
      console.error("RESEND_API_KEY is not configured");
      return response({ error: "Email service is not configured" }, 500);
    }

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: Deno.env.get("RESEND_FROM_EMAIL") || "CYRIX Website <onboarding@resend.dev>",
        to: [RECIPIENT],
        reply_to: email,
        subject: `CYRIX Contact: ${subject}`,
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      }),
    });

    if (!resendResponse.ok) {
      console.error("Resend request failed", await resendResponse.text());
      return response({ error: "Unable to send email" }, 502);
    }
    return response({ message: "Inquiry sent" }, 200);
  } catch (error) {
    console.error("Inquiry processing failed", error);
    return response({ error: "Invalid request" }, 400);
  }
});
