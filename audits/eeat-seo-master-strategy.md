# E-E-A-T & SEO Master Strategy
## Cheapest Car Insurance Tulsa - Oklahoma Auto Insurance Domination

**Domain:** cheapestcarinsurancetulsa.com
**YMYL Category:** Financial Services (Insurance)
**Target:** #1 for auto insurance keywords in Oklahoma

---

## E-E-A-T Framework for Insurance

### Why E-E-A-T Matters for Insurance
Insurance is a **YMYL (Your Money Your Life)** topic. Google holds these sites to the highest standards because bad advice can financially harm users. We must demonstrate:

| Signal | What Google Looks For | Our Implementation |
|--------|----------------------|-------------------|
| **Experience** | First-hand experience with the topic | Customer testimonials, case studies, agent stories |
| **Expertise** | Credentials, knowledge demonstration | Licensed agents, detailed guides, accurate information |
| **Authoritativeness** | Industry recognition, citations | BBB, industry directories, news mentions |
| **Trustworthiness** | Transparency, security, reviews | SSL, privacy policy, real reviews, clear disclosures |

---

## Site Architecture: Spoke & Wheel Silo Model

### Overview
```
                    [HOMEPAGE]
                   /    |    \
                  /     |     \
    [PILLAR: Coverage] [PILLAR: Locations] [PILLAR: Savings]
         /|\              /|\                  /|\
        / | \            / | \                / | \
    [Spokes]         [Spokes]            [Spokes]
```

### Silo 1: Coverage Types (Pillar: /oklahoma-car-insurance-coverage/)
```
PILLAR PAGE: Complete Guide to Car Insurance Coverage in Oklahoma
├── /liability-insurance-oklahoma/
├── /full-coverage-car-insurance-oklahoma/
├── /comprehensive-insurance-oklahoma/
├── /collision-insurance-oklahoma/
├── /uninsured-motorist-coverage-oklahoma/
├── /underinsured-motorist-coverage-oklahoma/
├── /medical-payments-coverage-oklahoma/
├── /personal-injury-protection-oklahoma/
├── /sr22-insurance-oklahoma/
└── /gap-insurance-oklahoma/
```

### Silo 2: Location Pages (Pillar: /oklahoma-car-insurance/)
```
PILLAR PAGE: Car Insurance in Oklahoma - Complete State Guide
├── /car-insurance-tulsa/ (homepage serves this)
├── /car-insurance-broken-arrow/
├── /car-insurance-owasso/
├── /car-insurance-jenks/
├── /car-insurance-bixby/
├── /car-insurance-sand-springs/
├── /car-insurance-sapulpa/
├── /tulsa-county-car-insurance/
└── /northeast-oklahoma-car-insurance/
```

### Silo 3: Driver Types (Pillar: /car-insurance-by-driver/)
```
PILLAR PAGE: Car Insurance for Every Driver Type in Oklahoma
├── /teen-driver-insurance-oklahoma/
├── /young-driver-insurance-oklahoma/
├── /senior-driver-insurance-oklahoma/
├── /high-risk-driver-insurance-oklahoma/
├── /good-driver-discount-oklahoma/
├── /military-car-insurance-oklahoma/
├── /new-driver-insurance-oklahoma/
└── /rideshare-insurance-oklahoma/
```

### Silo 4: Savings & Discounts (Pillar: /save-money-car-insurance/)
```
PILLAR PAGE: How to Save Money on Car Insurance in Oklahoma
├── /car-insurance-discounts-oklahoma/
├── /bundling-home-auto-insurance/
├── /pay-in-full-discount/
├── /defensive-driving-discount-oklahoma/
├── /good-student-discount/
├── /low-mileage-discount/
├── /safe-driver-discount/
└── /multi-car-discount/
```

### Silo 5: Claims & Process (Pillar: /car-insurance-claims/)
```
PILLAR PAGE: Understanding Car Insurance Claims in Oklahoma
├── /how-to-file-car-insurance-claim/
├── /what-to-do-after-car-accident-oklahoma/
├── /oklahoma-car-accident-laws/
├── /dealing-with-insurance-adjusters/
├── /understanding-deductibles/
└── /when-to-file-claim/
```

### Blog Content Calendar (Supporting Spokes)
Each silo should have 5-10 blog posts linking back to pillar pages:

**Coverage Silo Blog Topics:**
- "Liability vs Full Coverage: What Oklahoma Drivers Need to Know"
- "Is Comprehensive Insurance Worth It in Tulsa?"
- "Oklahoma's Minimum Insurance Requirements Explained"
- "SR-22 Insurance in Oklahoma: Complete Guide"

**Location Silo Blog Topics:**
- "Tulsa's Most Dangerous Intersections and Your Insurance"
- "How Tulsa ZIP Codes Affect Your Car Insurance Rates"
- "Broken Arrow vs Tulsa: Insurance Rate Comparison"
- "Oklahoma Hail Season: Protecting Your Vehicle"

**Savings Silo Blog Topics:**
- "10 Ways to Lower Your Car Insurance in Tulsa"
- "The Best Time to Shop for Car Insurance"
- "How Your Credit Score Affects Oklahoma Insurance Rates"
- "Bundling Insurance: Is It Really Cheaper?"

---

## Schema Markup Strategy

### 1. Organization Schema (Site-wide)
```json
{
  "@type": "InsuranceAgency",
  "@id": "https://cheapestcarinsurancetulsa.com/#organization",
  "name": "Cheapest Car Insurance",
  "founder": {...},
  "employee": [...],
  "knowsAbout": ["Auto Insurance", "Oklahoma Insurance Law", ...],
  "hasCredential": [...licenses...]
}
```

### 2. Person Schema (Author/Founder for E-E-A-T)
```json
{
  "@type": "Person",
  "@id": "https://cheapestcarinsurancetulsa.com/#founder",
  "name": "Dustin Wyzard",
  "jobTitle": "Founder & Licensed Insurance Agent",
  "worksFor": {"@id": ".../#organization"},
  "hasCredential": {
    "@type": "EducationalOccupationalCredential",
    "credentialCategory": "license",
    "name": "Oklahoma Insurance License",
    "recognizedBy": "Oklahoma Insurance Department"
  },
  "knowsAbout": ["Auto Insurance", "Oklahoma Insurance Regulations"]
}
```

### 3. Article Schema (Blog Posts)
```json
{
  "@type": "Article",
  "headline": "...",
  "author": {"@id": ".../#founder"},
  "publisher": {"@id": ".../#organization"},
  "datePublished": "...",
  "dateModified": "...",
  "mainEntityOfPage": "...",
  "speakable": {...}
}
```

### 4. FAQPage Schema (FAQ Sections)
```json
{
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the minimum car insurance required in Oklahoma?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oklahoma requires 25/50/25 liability coverage..."
      }
    }
  ]
}
```

### 5. HowTo Schema (Process Pages)
```json
{
  "@type": "HowTo",
  "name": "How to Get a Car Insurance Quote in Oklahoma",
  "step": [
    {"@type": "HowToStep", "name": "Gather Information", "text": "..."},
    {"@type": "HowToStep", "name": "Compare Quotes", "text": "..."}
  ]
}
```

### 6. LocalBusiness Schema (Each Location Page)
```json
{
  "@type": "InsuranceAgency",
  "name": "Cheapest Car Insurance - Broken Arrow",
  "areaServed": {"@type": "City", "name": "Broken Arrow"},
  "parentOrganization": {"@id": ".../#organization"}
}
```

### 7. Review Schema (Testimonials)
```json
{
  "@type": "Review",
  "author": {"@type": "Person", "name": "..."},
  "reviewRating": {"@type": "Rating", "ratingValue": 5},
  "reviewBody": "...",
  "itemReviewed": {"@id": ".../#organization"}
}
```

### 8. BreadcrumbList Schema (Navigation)
```json
{
  "@type": "BreadcrumbList",
  "itemListElement": [
    {"@type": "ListItem", "position": 1, "name": "Home", "item": "..."},
    {"@type": "ListItem", "position": 2, "name": "Coverage", "item": "..."}
  ]
}
```

---

## Meta Tag Strategy

### Title Tag Formula
```
Primary Keyword | Secondary Keyword | Brand
```

**Examples:**
- Homepage: `Cheapest Car Insurance Tulsa | Compare 10 Carriers | Free Quote`
- Location: `Car Insurance Broken Arrow OK | Compare Rates | Free Quote`
- Coverage: `Full Coverage Car Insurance Oklahoma | What's Included | Costs`
- Blog: `How to Lower Car Insurance in Tulsa | 10 Proven Tips`

### Meta Description Formula
```
[Hook/Benefit] + [What we offer] + [Differentiator] + [CTA]
```

**Examples:**
- Homepage: `Compare car insurance from 10 carriers in Tulsa, OK. Licensed independent agency. Get free quotes in minutes. No obligation.`
- Location: `Looking for cheap car insurance in Broken Arrow? Compare rates from Progressive, GEICO, Safeco & more. Free quotes from licensed Oklahoma agents.`

### Open Graph Tags
Every page needs:
- `og:title` - Same as title or slightly modified
- `og:description` - Same as meta description
- `og:image` - Unique branded image per page type
- `og:type` - `website` or `article`
- `og:url` - Canonical URL

### Twitter Cards
- `twitter:card` - `summary_large_image`
- `twitter:title`
- `twitter:description`
- `twitter:image`

---

## Image Alt Tag Standards

### Formula
```
[Descriptive text] + [Location if relevant] + [Context]
```

### Examples by Image Type

**Hero Images:**
- `Car insurance quote form for Tulsa Oklahoma drivers`
- `Family reviewing car insurance options in Oklahoma`

**Carrier Logos:**
- `Progressive Insurance logo - partner carrier`
- `GEICO logo - car insurance carrier in Oklahoma`

**Icons:**
- `Shield icon representing insurance protection`
- `Dollar sign icon for insurance savings`

**Team Photos:**
- `Dustin Wyzard, licensed Oklahoma insurance agent and founder`
- `Cheapest Car Insurance Tulsa office team`

**Location Images:**
- `Downtown Broken Arrow Oklahoma street view`
- `Tulsa Oklahoma skyline - service area`

**Blog Images:**
- `Infographic showing Oklahoma minimum insurance requirements`
- `Chart comparing car insurance rates by age in Tulsa`

### Image Optimization Checklist
- [ ] Descriptive filename (not IMG_001.jpg)
- [ ] Alt text under 125 characters
- [ ] WebP format with fallback
- [ ] Lazy loading for below-fold images
- [ ] Width/height attributes to prevent CLS
- [ ] Compressed to under 100KB

---

## E-E-A-T Implementation Checklist

### Experience Signals
- [ ] Customer testimonials with full names (with permission)
- [ ] Case studies: "How we saved [Customer] $X on insurance"
- [ ] Before/after rate comparisons
- [ ] Years of experience prominently displayed
- [ ] "Our Story" page with founder journey

### Expertise Signals
- [ ] Author bylines on all content
- [ ] Author bio with credentials
- [ ] License numbers displayed
- [ ] Detailed, accurate insurance guides
- [ ] Citations to Oklahoma Insurance Department
- [ ] Regular content updates with dates shown

### Authoritativeness Signals
- [ ] BBB accreditation displayed
- [ ] Industry association memberships
- [ ] Press mentions/media coverage
- [ ] Guest posts on industry sites
- [ ] Links from .gov/.edu if possible
- [ ] Google Business Profile optimization

### Trustworthiness Signals
- [ ] SSL certificate (HTTPS)
- [ ] Clear privacy policy
- [ ] Terms of service
- [ ] Contact information on every page
- [ ] Physical address displayed
- [ ] Real phone number (not just form)
- [ ] Customer reviews from Google/Yelp
- [ ] Secure quote form indicators
- [ ] Transparent pricing/disclosure language

---

## Technical SEO Checklist

### Core Web Vitals
- [ ] LCP < 2.5s
- [ ] FID < 100ms
- [ ] CLS < 0.1
- [ ] Mobile-first responsive design

### Crawlability
- [ ] XML sitemap submitted
- [ ] Robots.txt optimized
- [ ] No orphan pages
- [ ] Proper canonical tags
- [ ] No duplicate content

### Internal Linking
- [ ] Pillar pages link to all spoke pages
- [ ] Spoke pages link back to pillar
- [ ] Related content suggestions
- [ ] Breadcrumb navigation
- [ ] Footer links to key pages

### URL Structure
- [ ] Descriptive, keyword-rich URLs
- [ ] Lowercase, hyphenated
- [ ] No parameters on key pages
- [ ] Consistent trailing slash policy

---

## Content Quality Standards

### Every Page Must Have:
1. **Unique H1** with primary keyword
2. **Proper heading hierarchy** (H1 > H2 > H3)
3. **Above-fold value proposition**
4. **Author attribution** (for articles)
5. **Last updated date** (for guides)
6. **Internal links** to related content
7. **Clear CTA** (quote form or phone)
8. **Mobile-optimized layout**

### Blog Post Minimum Standards:
- 1,500+ words for pillar content
- 800+ words for spoke articles
- 3+ internal links
- 1+ external authoritative link
- 2+ images with alt text
- FAQ section where relevant
- Author byline and bio
- Published and updated dates

---

## Implementation Priority

### Phase 1: Foundation (Week 1)
1. ✅ Schema markup enhancement
2. Create About/Team page with founder bio
3. Add author component for blog posts
4. Implement breadcrumbs site-wide

### Phase 2: Pillar Pages (Week 2-3)
1. Oklahoma Car Insurance Coverage Guide (pillar)
2. Save Money on Car Insurance (pillar)
3. Oklahoma Car Insurance by Driver Type (pillar)
4. Claims Process Guide (pillar)

### Phase 3: Spoke Content (Week 4-8)
1. 5 coverage type pages
2. 5 savings/discount pages
3. 5 driver type pages
4. 10 supporting blog posts

### Phase 4: Optimization (Ongoing)
1. Image optimization audit
2. Meta tag refinement
3. Internal linking audit
4. Content freshness updates

---

## KPIs to Track

| Metric | Current | 3-Month Goal | 6-Month Goal |
|--------|---------|--------------|--------------|
| Organic Traffic | ? | +50% | +150% |
| Keyword Rankings (Top 10) | ? | 20 keywords | 50 keywords |
| Domain Authority | ? | +5 | +10 |
| Core Web Vitals | ? | All Green | All Green |
| Indexed Pages | ~100 | 150 | 200 |
| Backlinks | ? | +20 | +50 |
