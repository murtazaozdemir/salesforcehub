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

It's in the footer of every page. The footer has one home, `functions/_middleware.js`,
which adds it to each page as it's served.

## Site

- [x] Rewrite the site as the company's app showcase (DataVot and Xhibit first). Done 2026-10-03.
- [x] Home page narrowed to DataVot, Xhibit, AI Store Audit, StorageVisual and SEOnostics
      (2026-10-04). Dataly, SysXray and AppVitrine moved to the unlinked `/parked` page.
- [x] StorageVisual moved to `/parked` too (2026-10-04).
- [ ] Confirm the status labels: SEOnostics "Live", Xhibit "By arrangement".
- [ ] SEOnostics has no logo yet; it shows a letter tile. Add its icon to
      `public/images/apps/` when one exists.
- [x] Contact form connected (2026-10-04): KV namespace `salesforcehub-contact` bound as `CONTACT`
      in `wrangler.toml`.
- [ ] Contact form: decide how you'll read the messages. Today they only land in KV (Cloudflare
      dashboard → Storage & databases → KV → salesforcehub-contact); nothing notifies you.
- [x] Xhibit page at salesforcehub.us/xhibit (2026-10-04), copy taken from Xhibit's brochure.
- [x] Xhibit renamed ExhibitProof and moved to its own site, exhibitproof.com (2026-10-04, xhibit session):
  /exhibitproof and /xhibit 301 there; the /xhibit page was removed. Prices are public on exhibitproof.com/pricing.
- [x] Cloudflare Pages project `salesforcehub` (build output `public`, no build command),
      live at salesforcehub-e9g.pages.dev. Custom domains salesforcehub.us and
      www.salesforcehub.us attached 2026-10-04; the old A record to the Namecheap
      server (162.0.209.106) was replaced. Mail (Google MX) and SPF were left alone.
- [ ] Old Namecheap hosting: the site no longer uses it. Cancel it if nothing else
      lives there, and then drop its IPs from the SPF record.
