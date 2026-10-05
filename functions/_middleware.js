// Fills the shared slots on every HTML page as it's served, so the header and
// the footer — including the no-affiliation statement that must appear on
// every page — each live in exactly one place. Pages only carry empty slots:
//   <header data-site-header></header>   (optional; pages without it get none)
//   <footer data-site-footer></footer>
//   <p data-xhibit-disclaimer></p>       (wherever ExhibitProof is described)
//
// These are the only copies. Edit them here, never in a page.

const NAV = [
  { href: "/#apps", label: "Apps" },
  { href: "/#about", label: "About" },
];

const HEADER = (path) => `
    <div class="wrap header-row">
      <a class="wordmark" href="/" aria-label="Salesforce Hub LLC home">
        <svg class="wordmark-mark" viewBox="0 0 24 24" aria-hidden="true">
          <rect x="2" y="2" width="9" height="9" rx="2"/>
          <rect x="13" y="2" width="9" height="9" rx="2"/>
          <rect x="2" y="13" width="9" height="9" rx="2"/>
          <rect x="13" y="13" width="9" height="9" rx="2" class="wordmark-dot"/>
        </svg>
        Salesforce Hub
      </a>
      <nav class="site-nav" aria-label="Main">
        ${NAV.map((item) => `<a href="${item.href}"${item.path === path ? ' aria-current="page"' : ""}>${item.label}</a>`).join("\n        ")}
      </nav>
      <a class="button button--small" href="/#contact">Get in touch</a>
    </div>
  `;

const FOOTER = (year) => `
    <div class="wrap footer-row">
      <p>© ${year} Salesforce Hub LLC, New Jersey</p>
      <p class="legal">Salesforce Hub LLC is an independent software company. It is not affiliated with, endorsed by or sponsored by Salesforce, Inc. Salesforce is a trademark of Salesforce, Inc.</p>
    </div>
  `;

// Wording rules come from /Users/Shared/xhibit/webui/marketing.py (_FINE_PRINT).
const XHIBIT_DISCLAIMER =
  "Captures use only what a standard signed-in X account can see, through the ordinary X website. " +
  "Salesforce Hub LLC is not a law firm and doesn't give legal advice; whether evidence is admissible is always " +
  "for the court to decide. ExhibitProof shows what an account posted, not who typed it. " +
  "Not affiliated with or endorsed by X Corp. \u201cX\u201d is a trademark of X Corp.";

export async function onRequest({ request, next }) {
  const response = await next();
  const type = response.headers.get("Content-Type") || "";
  if (!type.includes("text/html")) return response;

  // "/page/" and "/page" are the same page.
  const path = new URL(request.url).pathname.replace(/\/+$/, "") || "/";
  const header = HEADER(path);
  const footer = FOOTER(new Date().getUTCFullYear());
  return new HTMLRewriter()
    .on("header[data-site-header]", { element: (el) => el.setInnerContent(header, { html: true }) })
    .on("footer[data-site-footer]", { element: (el) => el.setInnerContent(footer, { html: true }) })
    .on("[data-xhibit-disclaimer]", { element: (el) => el.setInnerContent(XHIBIT_DISCLAIMER) })
    .transform(response);
}
