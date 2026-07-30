# Search indexing

How to get the site indexed, and what the brand system will and will not do to rank.

## What this replaced, and why

The previous version of this file targeted "software engineer Cairo", "React developer
Egypt" and similar. Its ranking advice was to put the location everywhere: a "Based in
Cairo, Egypt" line in the footer, the city repeated through the About page, posts
titled "Building LMS Platforms in Cairo", and a block of `geo.region`,
`geo.placename` and `geo.position` meta tags pinning coordinates.

That is the strategy the brand retired. `BRAND.md` section 1 marks the location private
and gives the reason: a city in a descriptor does not read as a fact, it reads as a
**boundary**. To a CTO in Berlin or Toronto scanning the page, it answers a question
they had not asked and narrows the answer before the work is seen.

Nothing is hidden. The location stays in the structured `homeLocation` field in
`src/config/seo.js` — where a recruiter filtering by region actually looks, and the
same role LinkedIn's own location field plays. It is out of the visible copy, the
title, the description and the keywords.

The trade is deliberate: less regional search volume, no ceiling on who reads the work.

## Before anything else

`BRAND.md` section 17 lists this as issue 1, priority P0:

> Site is on a platform subdomain (`yousef-bakr-s-portfolio.vercel.app`) with a stray
> possessive in the URL.

Every canonical, every `og:url` and every generated brand asset bakes that string in.
Registering a domain is a bigger credibility move than anything below, and doing it
after indexing means a migration. Do it first.

When it changes: update `brand.json`, re-run the kit's build, then update
`BRAND.siteUrl` in `src/config/brand.js`. Everything else derives from there.

## Getting indexed

**1 · Search Console.** Add the property at
[search.google.com/search-console](https://search.google.com/search-console) using the
URL-prefix option. Verify by HTML file upload — drop the file in `public/` and deploy.
Confirm it resolves before clicking verify: `vercel.json` rewrites everything except
`sitemap.xml` and `robots.txt` to `index.html`, so a verification file will be served
correctly only because it is a real file in `public/`.

**2 · Submit the sitemap.** Enter `sitemap.xml` under Sitemaps.

**3 · Request indexing** per route rather than waiting for a crawl:

```
/  /about  /projects  /blog  /certificates  /cv  /contact  /lets-talk
```

`public/sitemap.xml` is maintained by hand, so adding a route means adding it there.
`/blog` was missing for months because nothing enforced it.

**4 · Confirm.**

```
site:yousef-bakr-s-portfolio.vercel.app
```

Expect discovery in days and most pages indexed within a few weeks.

Submit to [Bing Webmaster Tools](https://www.bing.com/webmasters) as well — it takes
minutes and also feeds DuckDuckGo.

## What the site already does

- JSON-LD `Person` and `WebSite` on every page, plus `WebPage`, `BreadcrumbList` and
  `ItemList` per route, merged into one `@graph` by `src/components/Seo.jsx`
- `BlogPosting` schema with `article:published_time` and `article:modified_time`,
  cleared when the reader leaves an article so a post's date does not follow them
- Canonical URLs, Open Graph and Twitter cards, pointing at the generated 1200x630
  card rather than a portrait
- `robots.txt` allowing crawl, and `theme-color` matching the page ground

All of it derives from `src/config/seo.js` and `src/config/brand.js`. There is one SEO
component; there used to be two, and their identity strings had drifted apart — one
said "Software Engineer Portfolio", the other "Full-Stack ... & Systems Analyst".

## Monitoring

Search Console for impressions, position and indexing status. What is worth checking is
which *queries* bring people, not the count — a rising number of impressions on a term
the brand does not want to own is a signal to change the content, not to celebrate.

## How this brand ranks

Not on keyword density. `BRAND.md` section 10 sets the mechanism: depth and
consistency, on the same days every week, aimed at one reader.

| Pillar | Share | What it does |
|---|---|---|
| The Decision Log | 60% | Architecture calls and their reasoning. What a senior engineer searches for, and what earns a link |
| The First Year | 25% | For juniors, held to the same evidence standard |
| The Operator | 15% | Method, never mood |

Section 9 rules out humour, trends and personal content — the three cheapest routes to
reach. That is a deliberate choice, and it means the site cannot compete on volume. It
competes on being worth a tech lead's four minutes.

Links follow from published work: LinkedIn, the GitHub profile README, and articles
cross-posted where engineers already read. Not from directory submissions or drops into
community forums.

Hashtags: three to five, at the end, never inside a sentence.
`#SoftwareArchitecture` `#NestJS` `#SystemDesign` `#SaaS` `#WebDevelopment`

## Troubleshooting

**Not indexed after two weeks.** Re-check ownership verification, look for crawl errors
in Search Console, confirm `robots.txt` is not blocking, and request indexing again.

**Only the homepage is indexed.** Confirm the sitemap submitted cleanly and that every
route is linked from somewhere in the navigation. Request the individual pages.

**Nothing ranks for a generic role term.** Expected. That is not a target here, and
pursuing it means writing content this brand does not publish.

## What not to do

Nothing in search advice overrides the brand:

- Do not reintroduce the location to visible copy, titles, descriptions or keywords,
  and do not add `geo.*` meta tags
- Do not title a post around a city or nationality
- Do not reintroduce a retired role noun — "Full-Stack Engineer", "Systems Analyst" and
  "Cloud Architect" are out of metadata as much as out of prose

```bash
npm run brand:check
```

enforces the first and third mechanically. The second needs eyes.
