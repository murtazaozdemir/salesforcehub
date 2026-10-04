# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

The company website for **Salesforce Hub LLC** (Clifton, NJ), at salesforcehub.us. The company builds and sells its
own apps; the site is a showcase for them, led by **DataVot** and **Xhibit**. Repo: `murtazaozdemir/salesforcehub`
(public).

**The company does no Salesforce CRM work.** Never describe or promote Salesforce implementation, consulting or org
tooling. The name is kept for now (renaming is an open item in `TODO.md`), and every page must carry this footer
statement, word for word:

> Salesforce Hub LLC is an independent software company. It is not affiliated with, endorsed by or sponsored by
> Salesforce, Inc. Salesforce is a trademark of Salesforce, Inc.

No Salesforce logos and no Salesforce blue. Public copy names the company, never the founder.

## Layout and commands

Static site with no build step, deployed on Cloudflare Pages.

- `public/` is the Pages build output directory (the only thing served). Keep notes like `TODO.md` outside it.
- `functions/api/contact.js` is a Pages Function behind the contact form. It writes to a KV namespace bound as
  `CONTACT`; without that binding it returns 503 with a clear message rather than pretending to succeed.
- `public/404.html` exists so unknown URLs get a real 404 instead of Pages' single-page-app fallback.
- `functions/_middleware.js` holds **the only copy of the footer** (including the no-affiliation statement) and
  injects it into `<footer data-site-footer>` on every HTML page at the edge. Pages carry only the empty slot; edit
  the footer there, never in a page. Opening a page file directly without `wrangler pages dev` shows no footer.
- `public/parked.html` (served at `/parked`): apps set aside for later (Dataly, SysXray, AppVitrine). Not linked
  from the site and marked noindex.

Run locally (serves `public/` plus `functions/`):

```bash
npx wrangler pages dev public --port 8799
```

Cloudflare Pages project `salesforcehub` (framework preset "None", build command empty, build output directory
`public`). Every push to `main` deploys to production at salesforcehub.us (also www and salesforcehub-e9g.pages.dev).
After a push, check the live site actually changed rather than trusting the push.

## Copy rules for the apps

App facts come from each app's own repo under `/Users/Shared/`; check there before changing a description. Don't
copy prices onto this site; link to the app's own pricing page instead, so there is one source of truth.

- **DataVot** (`/Users/Shared/datavot`, live at datavot.com): NJSLA dashboards for New Jersey schools. Don't claim
  SOC 2 or ISO certification.
- **Xhibit** (`/Users/Shared/xhibit`, not public, no domain yet): its rules live in `webui/marketing.py` and
  `webui/MARKETING-TODO.md`. Never say "court-ready", "guaranteed admissible" or "in 60 seconds". Always keep the
  disclaimers: not a law firm, no legal advice, admissibility is for the court, it shows what an account posted not
  who typed it, not affiliated with X Corp. Don't promise deletion at the end of a matter, and don't advertise
  AI sentiment or topic labels.

Icons in `public/images/apps/` and the DataVot screenshot are copies from those repos; refresh them from the source
if an app rebrands.

## Styling

Follow `/Users/Shared/reusable/APP-RULES.md` (Rule 1: build once and reuse; Rule 2: no inline styles). Colour tokens
in `public/styles.css` use the same names as the shared theme kit (`/Users/Shared/reusable/PortableThemes/html-css/`).
Light and dark mode follow the visitor's system setting.

## What's on the home page

Focus apps, in this order: DataVot, Xhibit, AI Store Audit, StorageVisual, SEOnostics (seonostics.com,
`/Users/Shared/SEOnostics`). Everything else goes on `/parked` until Murtaza says otherwise.
