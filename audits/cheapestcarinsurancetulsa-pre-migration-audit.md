# Pre-Migration Audit: cheapestcarinsurancetulsa.com

**Crawl Date:** January 2026
**Tool:** Screaming Frog SEO Spider 23.2
**URLs Crawled:** 499 of 500 (1 external blocked by robots.txt)
**Site Type:** WordPress blog/informational

---

## Executive Summary

The WordPress site has **significant technical debt** that must be addressed before or during migration to prevent carrying over bad practices. The root cause of most high-priority issues is **plugin/theme conflicts** generating invalid HTML.

| Priority | Issues | URLs Affected |
|----------|--------|---------------|
| **HIGH** | Invalid HTML structure, 4xx errors, noindex | 70+ URLs |
| **MEDIUM** | Missing H1s, long titles, large images | 350+ URLs |
| **LOW** | Security headers, readability, anchor text | 400+ URLs |

---

## HIGH PRIORITY - Fix Before Migration

These issues affect crawlability, indexing, and rendering.

### 1. Invalid HTML Structure (Plugin/Theme Conflicts)

| Issue | URLs | % | Root Cause |
|-------|------|---|------------|
| Multiple `<head>` tags | 5 | 1.06% | Conflicting SEO plugins |
| Multiple `<body>` tags | 6 | 1.27% | Page builder conflicts |
| Multiple `<title>` tags | 5 | 1.56% | Multiple SEO plugins |
| `<title>` outside `<head>` | 5 | 1.56% | Theme/plugin injection |
| Multiple meta descriptions | 3 | 0.93% | Plugin conflicts |
| Meta description outside `<head>` | 3 | 0.93% | Plugin conflicts |
| Directives outside `<head>` | 1 | 0.23% | Plugin conflicts |
| Canonical outside `<head>` | 1 | 0.31% | Plugin conflicts |

**Action Required:**
- [ ] Export affected URLs from Validation tab
- [ ] Identify conflicting plugins (likely multiple SEO plugins active)
- [ ] Keep ONE SEO plugin only (Yoast OR Rank Math, not both)
- [ ] Check theme for built-in SEO features that conflict
- [ ] View source on affected pages to identify which plugin injects duplicates
- [ ] **For migration:** Ensure React build has single, valid HTML structure

### 2. Broken Internal Links (4xx Errors)

| Issue | URLs | % |
|-------|------|---|
| Internal Client Error (4xx) | 26 | 5.2% |

**Action Required:**
- [ ] Export 4xx URLs from Response Codes tab
- [ ] Export Inlinks to see what pages link to broken URLs
- [ ] Create 301 redirect map for valid redirects
- [ ] Remove links to pages that no longer exist
- [ ] **For migration:** Do NOT migrate broken links - use redirect map

### 3. Noindex Directives

| Issue | URLs | % |
|-------|------|---|
| Noindex directive | 24 | 5.58% |

**Action Required:**
- [ ] Export noindexed URLs from Directives tab
- [ ] Review each - determine if intentional (thin tag pages) or mistake
- [ ] Remove noindex from valuable content pages
- [ ] **For migration:** Only carry over intentional noindex directives

### 4. Canonicalization Issues

| Issue | URLs | % |
|-------|------|---|
| Canonicalised to different URL | 2 | 0.62% |

**Action Required:**
- [ ] Review canonical targets - ensure they're correct
- [ ] **For migration:** Implement proper self-referencing canonicals

---

## MEDIUM PRIORITY - Fix During Migration

### 5. Missing/Multiple H1 Tags (CRITICAL for SEO)

| Issue | URLs | % |
|-------|------|---|
| **H1 Missing** | **214** | **66.67%** |
| H1 Multiple | 30 | 9.35% |
| H1 Non-Sequential | 81 | 25.23% |
| H1 Over 70 Characters | 21 | 6.54% |
| H1 Duplicate | 10 | 3.12% |

**Action Required:**
- [ ] Export all pages missing H1
- [ ] Map post titles to become H1s
- [ ] **For migration:** Ensure every page template has exactly ONE `<h1>`
- [ ] Use post/page title as H1 content

### 6. Page Title Issues

| Issue | URLs | % |
|-------|------|---|
| Over 60 Characters | 123 | 38.32% |
| Over 561 Pixels | 118 | 36.76% |
| Below 30 Characters | 4 | 1.25% |
| Duplicate | 2 | 0.62% |
| Same as H1 | 4 | 1.25% |

**Action Required:**
- [ ] Export titles over 60 chars
- [ ] Rewrite to ~50-60 characters with keywords front-loaded
- [ ] **For migration:** Create title templates by page type

### 7. Meta Description Issues

| Issue | URLs | % |
|-------|------|---|
| **Missing** | **212** | **66.04%** |
| Over 155 Characters | 13 | 4.05% |
| Over 985 Pixels | 6 | 1.87% |
| Below 70 Characters | 3 | 0.93% |
| Below 400 Pixels | 3 | 0.93% |
| Duplicate | 4 | 1.25% |

**Action Required:**
- [ ] Export pages missing meta descriptions
- [ ] Write unique descriptions (120-155 chars) for all key pages
- [ ] **For migration:** Implement meta description field in CMS/content system

### 8. Image Optimization

| Issue | URLs | % |
|-------|------|---|
| Over 100 KB | 35 | 74.47% |
| Missing Alt Text | 22 | 46.81% |
| Alt Text Over 100 Characters | 9 | 19.15% |
| Missing Size Attributes | 15 | 31.91% |

**Action Required:**
- [ ] Export large images - compress to <100KB
- [ ] Add descriptive alt text to all images
- [ ] Add width/height attributes to prevent CLS
- [ ] **For migration:** Implement image optimization pipeline (WebP, lazy loading)

### 9. H2 Issues

| Issue | URLs | % |
|-------|------|---|
| Duplicate | 295 | 91.9% |
| Multiple | 295 | 91.9% |
| Over 70 Characters | 93 | 28.97% |
| Non-Sequential | 6 | 1.87% |

**Action Required:**
- [ ] Review H2 structure - likely template-based duplicates
- [ ] **For migration:** Design proper heading hierarchy in components

---

## LOW PRIORITY - Address Post-Migration

### 10. Security Headers (90%+ Missing)

| Header | URLs Missing | % |
|--------|--------------|---|
| Content-Security-Policy | 430 | 90.91% |
| HSTS | 430 | 90.91% |
| X-Content-Type-Options | 430 | 90.91% |
| X-Frame-Options | 429 | 90.7% |
| Secure Referrer-Policy | 429 | 90.7% |

**Action Required:**
- [ ] **For migration:** Configure security headers in Vercel (`vercel.json`)

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "SAMEORIGIN" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Strict-Transport-Security", "value": "max-age=31536000; includeSubDomains" }
      ]
    }
  ]
}
```

### 11. Internal Link Issues

| Issue | URLs | % |
|-------|------|---|
| Internal Nofollow Outlinks | 321 | 100% |
| Internal Outlinks With No Anchor Text | 315 | 98.13% |
| Non-Descriptive Anchor Text | 2 | 0.62% |

**Action Required:**
- [ ] Remove unnecessary `rel="nofollow"` from internal links
- [ ] Add descriptive anchor text to all internal links
- [ ] **For migration:** Ensure all internal links have proper anchor text

### 12. Content Readability

| Issue | URLs | % |
|-------|------|---|
| Very Difficult (college+ level) | 262 | 81.62% |
| Difficult | 33 | 10.28% |

**Action Required:**
- [ ] Review content for simpler language
- [ ] Shorter sentences, less jargon
- [ ] **For migration:** Consider content rewrite for key pages

### 13. URL Structure

| Issue | URLs | % |
|-------|------|---|
| Over 115 Characters | 17 | 3.59% |
| Contains Parameters | 3 | 0.63% |

**Action Required:**
- [ ] Review long URLs - shorten if changing anyway
- [ ] **For migration:** Implement clean URL structure

### 14. Redirects

| Issue | URLs | % |
|-------|------|---|
| Internal Redirects (3xx) | 17 | 3.4% |

**Action Required:**
- [ ] Update internal links to point to final destinations
- [ ] **For migration:** Create redirect map, update all internal links

### 15. Cross-Origin Security

| Issue | URLs | % |
|-------|------|---|
| Unsafe Cross-Origin Links | 320 | 67.65% |
| Protocol-Relative Resource Links | 3 | 0.63% |

**Action Required:**
- [ ] Add `rel="noopener"` to external links with `target="_blank"`
- [ ] Change protocol-relative URLs to absolute HTTPS

---

## Reports to Export from Screaming Frog

Run these exports for detailed URL lists:

### Critical Exports (Do First)
1. **Response Codes > Client Error (4xx)** - Broken pages list
2. **Bulk Export > Response Codes > Client Error (4xx) Inlinks** - What links to broken pages
3. **Directives > Noindex** - Pages blocked from indexing
4. **Validation > Multiple `<head>` Tags** - Invalid HTML pages
5. **Validation > Multiple `<body>` Tags** - Invalid HTML pages

### SEO Exports
6. **H1 > Missing** - Pages needing H1 added
7. **Page Titles > Over 60 Characters** - Titles to shorten
8. **Meta Description > Missing** - Pages needing descriptions
9. **Images > Over 100 KB** - Images to compress
10. **Images > Missing Alt Text** - Images needing alt text

### Link Exports
11. **Bulk Export > Links > Internal Nofollow Outlinks**
12. **Bulk Export > Links > Internal Outlinks With No Anchor Text**
13. **Response Codes > Redirection (3xx)** - Redirect chains to fix

---

## Migration Checklist

Before going live with new React site:

- [ ] All 4xx URLs have 301 redirects configured
- [ ] Noindex pages reviewed and intentional only
- [ ] Every page has exactly one `<h1>` tag
- [ ] All pages have unique `<title>` under 60 chars
- [ ] All pages have unique meta descriptions (120-155 chars)
- [ ] All images optimized (<100KB, with alt text, with dimensions)
- [ ] Security headers configured in `vercel.json`
- [ ] Internal links have descriptive anchor text
- [ ] No internal `rel="nofollow"` links
- [ ] External `target="_blank"` links have `rel="noopener"`
- [ ] Clean URL structure (no parameters, under 115 chars)
- [ ] Proper heading hierarchy (H1 > H2 > H3)
- [ ] Self-referencing canonical tags on all pages

---

## Summary Statistics

| Category | Total Issues |
|----------|--------------|
| High Priority (Blocking) | ~70 URLs |
| Medium Priority (SEO Impact) | ~350 URLs |
| Low Priority (Best Practice) | ~400 URLs |
| **Total Unique Issues** | **50 issue types** |
| **Issues** | 11 |
| **Warnings** | 16 |
| **Opportunities** | 23 |

**Primary Root Cause:** Plugin/theme conflicts in WordPress generating invalid HTML structure.

**Recommended Fix Order:**
1. Fix plugin conflicts (resolves ~20 high-priority issues)
2. Create redirect map for 4xx errors
3. Add missing H1s and meta descriptions
4. Optimize images
5. Configure security headers for new site
