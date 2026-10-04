# TODO — salesforcehub.us

## Consider renaming the business (open — Murtaza to decide)

Salesforce Hub LLC (Clifton, NJ) has been registered for about three years and the
name stays **for now**. Before charging companies for the apps, decide whether to
rename.

Why it's on the list: the name contains another company's trademark, and Salesforce
Hub LLC has nothing to do with that company or its CRM. The business develops and
sells its own apps.

A rename would touch: the LLC filing, the salesforcehub.us domain, this repo name,
the site copy, and the GitHub repo `murtazaozdemir/salesforcehub`. Worth a quick
check with a trademark lawyer either way.

## Until then: the no-affiliation statement goes on every page

Wording used on the site:

> Salesforce Hub LLC is an independent software company. It is not affiliated with,
> endorsed by or sponsored by Salesforce, Inc. Salesforce is a trademark of
> Salesforce, Inc.

It's in the footer of every page (`public/index.html` and `public/404.html`). If the
site grows beyond these two pages, move the footer into one shared include rather than
pasting it into each page.

## Site

- [x] Rewrite the site as the company's app showcase (DataVot and Xhibit first). Done 2026-10-03.
- [ ] Confirm the status labels: SysXray, StorageVisual and Dataly are shown as "Beta",
      AppVitrine as "Live", Xhibit as "By arrangement".
- [ ] Contact form: create a KV namespace and bind it to the Pages project as `CONTACT`
      (until then the form says it isn't connected yet). Decide how you'll read the
      messages (KV dashboard, or forward them by email).
- [ ] Xhibit: once it has a domain and prices, link to them from the Xhibit section.
- [x] Cloudflare Pages project `salesforcehub` (build output `public`, no build command),
      live at salesforcehub-e9g.pages.dev. Custom domains salesforcehub.us and
      www.salesforcehub.us attached 2026-10-04; the old A record to the Namecheap
      server (162.0.209.106) was replaced. Mail (Google MX) and SPF were left alone.
- [ ] Old Namecheap hosting: the site no longer uses it. Cancel it if nothing else
      lives there, and then drop its IPs from the SPF record.
