const fs = require('fs');
const path = require('path');
const https = require('https');

const WORDPRESS_API_URL = 'https://cheapestcarinsurancetulsa.com/wp-json/wp/v2';
const CONTENT_DIR = path.join(__dirname, '..', 'content');
const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const MEDIA_DIR = path.join(PUBLIC_DIR, 'wp-content', 'uploads');

// Ensure directories exist
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Fetch JSON from URL
async function fetchJSON(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

// Download file
async function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    ensureDir(path.dirname(dest));
    const file = fs.createWriteStream(dest);
    https.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        // Follow redirect
        downloadFile(res.headers.location, dest).then(resolve).catch(reject);
        return;
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

// Fetch all items with pagination
async function fetchAll(endpoint) {
  const items = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const url = `${WORDPRESS_API_URL}${endpoint}?per_page=100&page=${page}`;
    console.log(`Fetching ${url}`);
    try {
      const data = await fetchJSON(url);
      if (data.length === 0) {
        hasMore = false;
      } else {
        items.push(...data);
        page++;
        if (data.length < 100) hasMore = false;
      }
    } catch (e) {
      hasMore = false;
    }
  }

  return items;
}

// Process content to make image URLs local
function processContent(html) {
  if (!html) return html;
  // Replace WordPress URLs with local paths
  return html
    .replace(/https?:\/\/cheapestcarinsurancetulsa\.com\/wp-content\/uploads/g, '/wp-content/uploads')
    .replace(/https?:\/\/www\.cheapestcarinsurancetulsa\.com\/wp-content\/uploads/g, '/wp-content/uploads');
}

// Extract image URLs from content
function extractImageUrls(html) {
  if (!html) return [];
  const urls = [];
  const regex = /https?:\/\/(?:www\.)?cheapestcarinsurancetulsa\.com\/wp-content\/uploads\/[^"'\s)]+/g;
  let match;
  while ((match = regex.exec(html)) !== null) {
    urls.push(match[0]);
  }
  return urls;
}

async function migrate() {
  console.log('Starting WordPress content migration...\n');

  // Ensure directories
  ensureDir(CONTENT_DIR);
  ensureDir(MEDIA_DIR);

  // Fetch all content
  console.log('=== Fetching Posts ===');
  const posts = await fetchAll('/posts');
  console.log(`Found ${posts.length} posts\n`);

  console.log('=== Fetching Pages ===');
  const pages = await fetchAll('/pages');
  console.log(`Found ${pages.length} pages\n`);

  console.log('=== Fetching Categories ===');
  const categories = await fetchAll('/categories');
  console.log(`Found ${categories.length} categories\n`);

  console.log('=== Fetching Tags ===');
  const tags = await fetchAll('/tags');
  console.log(`Found ${tags.length} tags\n`);

  console.log('=== Fetching Media ===');
  const media = await fetchAll('/media');
  console.log(`Found ${media.length} media items\n`);

  // Collect all image URLs from content
  const imageUrls = new Set();

  // Process posts
  const processedPosts = posts.map(post => {
    // Extract images from content
    extractImageUrls(post.content?.rendered).forEach(url => imageUrls.add(url));
    extractImageUrls(post.excerpt?.rendered).forEach(url => imageUrls.add(url));

    return {
      id: post.id,
      slug: post.slug,
      date: post.date,
      modified: post.modified,
      title: post.title?.rendered || '',
      content: processContent(post.content?.rendered || ''),
      excerpt: processContent(post.excerpt?.rendered || ''),
      featured_media: post.featured_media,
      categories: post.categories,
      tags: post.tags,
      author: post.author,
      status: post.status,
    };
  });

  // Process pages
  const processedPages = pages.map(page => {
    extractImageUrls(page.content?.rendered).forEach(url => imageUrls.add(url));
    extractImageUrls(page.excerpt?.rendered).forEach(url => imageUrls.add(url));

    return {
      id: page.id,
      slug: page.slug,
      date: page.date,
      modified: page.modified,
      title: page.title?.rendered || '',
      content: processContent(page.content?.rendered || ''),
      excerpt: processContent(page.excerpt?.rendered || ''),
      featured_media: page.featured_media,
      parent: page.parent,
      menu_order: page.menu_order,
      author: page.author,
      status: page.status,
    };
  });

  // Process media
  const processedMedia = media.map(item => {
    if (item.source_url) {
      imageUrls.add(item.source_url);
    }
    // Add different sizes
    if (item.media_details?.sizes) {
      Object.values(item.media_details.sizes).forEach(size => {
        if (size.source_url) imageUrls.add(size.source_url);
      });
    }

    return {
      id: item.id,
      slug: item.slug,
      title: item.title?.rendered || '',
      alt_text: item.alt_text || '',
      source_url: item.source_url?.replace(/https?:\/\/(?:www\.)?cheapestcarinsurancetulsa\.com/, '') || '',
      media_details: item.media_details ? {
        width: item.media_details.width,
        height: item.media_details.height,
        sizes: Object.fromEntries(
          Object.entries(item.media_details.sizes || {}).map(([key, size]) => [
            key,
            {
              width: size.width,
              height: size.height,
              source_url: size.source_url?.replace(/https?:\/\/(?:www\.)?cheapestcarinsurancetulsa\.com/, '') || '',
            }
          ])
        ),
      } : null,
    };
  });

  // Save JSON files
  console.log('=== Saving Content Files ===');

  fs.writeFileSync(
    path.join(CONTENT_DIR, 'posts.json'),
    JSON.stringify(processedPosts, null, 2)
  );
  console.log(`Saved ${processedPosts.length} posts to content/posts.json`);

  fs.writeFileSync(
    path.join(CONTENT_DIR, 'pages.json'),
    JSON.stringify(processedPages, null, 2)
  );
  console.log(`Saved ${processedPages.length} pages to content/pages.json`);

  fs.writeFileSync(
    path.join(CONTENT_DIR, 'categories.json'),
    JSON.stringify(categories.map(c => ({
      id: c.id,
      name: c.name,
      slug: c.slug,
      description: c.description,
      parent: c.parent,
      count: c.count,
    })), null, 2)
  );
  console.log(`Saved ${categories.length} categories to content/categories.json`);

  fs.writeFileSync(
    path.join(CONTENT_DIR, 'tags.json'),
    JSON.stringify(tags.map(t => ({
      id: t.id,
      name: t.name,
      slug: t.slug,
      description: t.description,
      count: t.count,
    })), null, 2)
  );
  console.log(`Saved ${tags.length} tags to content/tags.json`);

  fs.writeFileSync(
    path.join(CONTENT_DIR, 'media.json'),
    JSON.stringify(processedMedia, null, 2)
  );
  console.log(`Saved ${processedMedia.length} media items to content/media.json\n`);

  // Download images
  console.log('=== Downloading Media Files ===');
  console.log(`Found ${imageUrls.size} unique image URLs to download\n`);

  let downloaded = 0;
  let failed = 0;

  for (const url of imageUrls) {
    try {
      // Extract path from URL
      const urlPath = url.replace(/https?:\/\/(?:www\.)?cheapestcarinsurancetulsa\.com/, '');
      const localPath = path.join(PUBLIC_DIR, urlPath);

      // Skip if already exists
      if (fs.existsSync(localPath)) {
        console.log(`Skipping (exists): ${urlPath}`);
        downloaded++;
        continue;
      }

      console.log(`Downloading: ${urlPath}`);
      await downloadFile(url, localPath);
      downloaded++;
    } catch (e) {
      console.error(`Failed to download: ${url} - ${e.message}`);
      failed++;
    }
  }

  console.log(`\n=== Migration Complete ===`);
  console.log(`Posts: ${processedPosts.length}`);
  console.log(`Pages: ${processedPages.length}`);
  console.log(`Categories: ${categories.length}`);
  console.log(`Tags: ${tags.length}`);
  console.log(`Media items: ${processedMedia.length}`);
  console.log(`Images downloaded: ${downloaded}`);
  console.log(`Images failed: ${failed}`);
}

migrate().catch(console.error);
