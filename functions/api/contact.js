// Cloudflare Pages Function: POST /api/contact
// Stores each message in the KV namespace bound as CONTACT (Pages project →
// Settings → Bindings). Until that binding exists the form answers 503 with a
// clear message instead of pretending it worked.

const APPS = new Set(["datavot", "xhibit", "other"]);
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function onRequestPost({ request, env }) {
  const wantsJson = (request.headers.get("Accept") || "").includes("application/json");

  let form;
  try {
    form = await request.formData();
  } catch {
    return reply(request, wantsJson, 400, "The form data couldn't be read. Reload the page and try again.");
  }

  const email = String(form.get("email") || "").trim().slice(0, 254);
  const app = String(form.get("app") || "other");
  const message = String(form.get("message") || "").trim().slice(0, 2000);

  if (!EMAIL_RE.test(email)) {
    return reply(request, wantsJson, 400, "Enter an email address like name@example.com.");
  }
  if (!env.CONTACT) {
    return reply(request, wantsJson, 503, "The contact form isn't connected yet. Please try again later.");
  }

  const receivedAt = new Date().toISOString();
  await env.CONTACT.put(`${receivedAt}:${crypto.randomUUID()}`, JSON.stringify({
    email,
    app: APPS.has(app) ? app : "other",
    message,
    receivedAt,
  }));

  return reply(request, wantsJson, 200, "Message sent. We'll reply by email.");
}

function reply(request, wantsJson, status, message) {
  if (wantsJson) {
    const body = status === 200 ? { ok: true } : { error: message };
    return Response.json(body, { status });
  }
  // No-JS form post: send the visitor back to the form with a plain result.
  const outcome = status === 200 ? "sent" : "failed";
  return Response.redirect(new URL(`/?contact=${outcome}#contact`, request.url).toString(), 303);
}
