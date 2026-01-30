# Cheapest Car Insurance Tulsa - Next.js Static Site

A static site built with Next.js that pulls content from the WordPress REST API at CheapestCarInsuranceTulsa.com and deploys to Vercel.

## Features

- **Static Generation (SSG)**: Pages are pre-rendered at build time for optimal performance
- **WordPress Integration**: Pulls posts, pages, and media from WordPress REST API
- **Automatic Revalidation**: Content revalidates every hour (ISR)
- **SEO Optimized**: Meta tags, Open Graph, and automatic sitemap generation
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Image Optimization**: Next.js Image component for optimized image loading

## Project Structure

```
site/
├── src/
│   ├── app/
│   │   ├── page.tsx           # Homepage
│   │   ├── layout.tsx         # Root layout with header/footer
│   │   ├── blog/
│   │   │   ├── page.tsx       # Blog listing
│   │   │   └── [slug]/page.tsx # Individual blog posts
│   │   ├── [slug]/page.tsx    # Dynamic WordPress pages
│   │   ├── quote/page.tsx     # Quote form page
│   │   └── api/sitemap/       # Dynamic sitemap
│   ├── components/
│   │   ├── Header.tsx         # Navigation header
│   │   ├── Footer.tsx         # Site footer
│   │   └── PostCard.tsx       # Blog post card component
│   └── lib/
│       └── wordpress.ts       # WordPress API service layer
├── .env.local                 # Environment variables
├── next.config.ts             # Next.js configuration
└── vercel.json                # Vercel deployment config
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
cd site
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
```

## Deployment to Vercel

### Option 1: Deploy via Vercel CLI

```bash
npm i -g vercel
cd site
vercel
```

### Option 2: Deploy via GitHub

1. Push this repository to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import the repository
4. Set the root directory to `site`
5. Deploy

### Environment Variables

Set these in Vercel dashboard:

- `WORDPRESS_API_URL`: WordPress REST API endpoint (default: https://cheapestcarinsurancetulsa.com/wp-json/wp/v2)
- `NEXT_PUBLIC_SITE_URL`: Your site URL for sitemap generation

## WordPress API Endpoints Used

- `/wp/v2/posts` - Blog posts
- `/wp/v2/pages` - Static pages
- `/wp/v2/media` - Images and media
- `/wp/v2/categories` - Post categories
- `/wp/v2/tags` - Post tags

## Content Revalidation

The site uses Incremental Static Regeneration (ISR):
- Pages revalidate every **1 hour** (3600 seconds)
- Site info revalidates every **24 hours**

To force a full rebuild, redeploy via Vercel dashboard or push a new commit.

## Customization

### Adding New Pages

WordPress pages are automatically available at `/{slug}`. Reserved routes (`blog`, `quote`, `api`) are handled separately.

### Styling

The site uses Tailwind CSS with the typography plugin for prose content. Edit `src/app/globals.css` for custom styles.

### Components

Add new components to `src/components/` and import them where needed.
