// Cloudflare Pages Function: POST /api/contact
// Stores each message in the KV namespace bound as CONTACT (see wrangler.toml).
// Until that binding exists the form answers 503 with a clear message instead
// of pretending it worked. Each stored message is also emailed through the
// salesforcehub-mailer Worker (MAILER service binding, see mailer/); the KV copy
// is the record, so a failed email is logged rather than shown to the visitor.

const APPS = {
  datavot: "DataVot",
  xhibit: "ExhibitProof",
  aistoreaudit: "AI Store Audit",
  seonostics: "SEOnostics",
  other: "Something else",
};
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function onRequestPost({ request, env, waitUntil }) {
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

  const entry = { email, app: Object.hasOwn(APPS, app) ? app : "other", message, receivedAt: new Date().toISOString() };
  await env.CONTACT.put(`${entry.receivedAt}:${crypto.randomUUID()}`, JSON.stringify(entry));
  waitUntil(notify(env, entry));

  return reply(request, wantsJson, 200, "Message sent. We'll reply by email.");
}

async function notify(env, entry) {
  if (!env.MAILER) {
    console.warn("contact: message stored but not emailed (MAILER binding missing)");
    return;
  }
  try {
    const res = await env.MAILER.fetch("https://mailer/", {
      method: "POST",
      body: JSON.stringify({ ...entry, app: APPS[entry.app] }),
    });
    if (!res.ok) console.error(`contact: email failed: ${await res.text()}`);
  } catch (err) {
    console.error(`contact: mailer unreachable: ${err.message}`);
  }
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
