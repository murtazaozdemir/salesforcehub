# TODO — salesforcehub.us

## Consider renaming the business (open — Murtaza to decide)

Salesforce Hub LLC (Clifton, NJ) has been registered for about three years and the
name stays **for now**. Before charging companies for the apps, decide whether to
rename.

Why it's on the list:
- Salesforce's trademark guidelines bar using "Salesforce", or anything confusingly
  similar, in company, product, website or domain names without written permission,
  and Salesforce has made companies rename before:
  https://www.salesforce.com/company/legal/tmcusageguidelines/
- The business no longer does any Salesforce CRM work (scope changed 2026-10-03:
  it develops and sells its own apps), so the name no longer even describes a
  connection to Salesforce.
- Salesforce runs its own "Salesforce Hub" content pages (salesforce.com/…/hub/sales),
  which makes confusion more likely.

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
- [ ] Cloudflare Pages project: connect `murtazaozdemir/salesforcehub` (build output
      directory `public`, no build command), then attach the custom domain salesforcehub.us.
