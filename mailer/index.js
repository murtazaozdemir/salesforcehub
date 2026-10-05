// salesforcehub-mailer: called only by the salesforcehub Pages project through its MAILER
// service binding. POST a JSON contact entry ({ email, app, message, receivedAt }) and it
// emails it to CONTACT_TO with Reply-To set to the visitor.

const FROM = { email: "noreply@salesforcehub.us", name: "salesforcehub.us contact form" };

export default {
  async fetch(request, env) {
    if (request.method !== "POST") return new Response("Method not allowed", { status: 405 });
    if (!env.CONTACT_TO) return new Response("CONTACT_TO secret missing", { status: 500 });

    const { email, app, message, receivedAt } = await request.json();
    const lines = [`From: ${email}`, `About: ${app}`, `Received: ${receivedAt}`, "", message || "(no message)"];
    try {
      const { messageId } = await env.EMAIL.send({
        from: FROM,
        to: env.CONTACT_TO,
        replyTo: email,
        subject: `Contact form: ${app} (${email})`,
        text: lines.join("\n"),
        html: `<pre style="font: 15px/1.5 system-ui, sans-serif; white-space: pre-wrap">${escapeHtml(lines.join("\n"))}</pre>`,
      });
      return Response.json({ ok: true, messageId });
    } catch (err) {
      return Response.json({ ok: false, code: err.code || "unknown", error: err.message }, { status: 502 });
    }
  },
};

function escapeHtml(text) {
  return text.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
}
