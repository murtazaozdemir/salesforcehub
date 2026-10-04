// Fills <footer data-site-footer> on every HTML page as it's served, so the
// footer — and the no-affiliation statement that must appear on every page —
// lives in exactly one place. Pages only carry the empty slot.
//
// This is the only copy of the footer. Edit it here, never in a page.
const FOOTER = (year) => `
    <div class="wrap footer-row">
      <p>© ${year} Salesforce Hub LLC, Clifton, New Jersey</p>
      <p class="legal">Salesforce Hub LLC is an independent software company. It is not affiliated with, endorsed by or sponsored by Salesforce, Inc. Salesforce is a trademark of Salesforce, Inc.</p>
    </div>
  `;

export async function onRequest({ next }) {
  const response = await next();
  const type = response.headers.get("Content-Type") || "";
  if (!type.includes("text/html")) return response;

  const html = FOOTER(new Date().getUTCFullYear());
  return new HTMLRewriter()
    .on("footer[data-site-footer]", {
      element(el) {
        el.setInnerContent(html, { html: true });
      },
    })
    .transform(response);
}
