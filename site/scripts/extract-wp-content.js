/**
 * Extract WordPress posts and pages from SQL dump.
 * Parses the wp_posts INSERT statements and merges with existing content JSON.
 *
 * Usage: node extract-wp-content.js
 */
const fs = require('fs');
const path = require('path');

const SQL_FILE = path.join(__dirname, 'wp_dump.sql');
const CONTENT_DIR = path.join(__dirname, '..', 'content');

const TABLE_PREFIX = 'wp_q876tt7znk_';

// wp_posts column order from the CREATE TABLE statement
const POST_COLUMNS = [
  'ID', 'post_author', 'post_date', 'post_date_gmt', 'post_content',
  'post_title', 'post_excerpt', 'post_status', 'comment_status', 'ping_status',
  'post_password', 'post_name', 'to_ping', 'pinged', 'post_modified',
  'post_modified_gmt', 'post_content_filtered', 'post_parent', 'guid',
  'menu_order', 'post_type', 'post_mime_type', 'comment_count'
];

// Parse a MySQL VALUES row, handling escaped quotes and nested parens
function parseValuesRow(row) {
  const values = [];
  let current = '';
  let inString = false;
  let i = 0;

  while (i < row.length) {
    const ch = row[i];

    if (inString) {
      if (ch === '\\' && i + 1 < row.length) {
        // Escaped character
        current += ch + row[i + 1];
        i += 2;
        continue;
      }
      if (ch === "'") {
        // Check for '' (escaped quote in SQL)
        if (i + 1 < row.length && row[i + 1] === "'") {
          current += "'";
          i += 2;
          continue;
        }
        // End of string
        inString = false;
        i++;
        continue;
      }
      current += ch;
      i++;
    } else {
      if (ch === "'") {
        inString = true;
        i++;
        continue;
      }
      if (ch === ',') {
        values.push(current.trim());
        current = '';
        i++;
        continue;
      }
      if (ch === '(' || ch === ')') {
        i++;
        continue;
      }
      current += ch;
      i++;
    }
  }
  if (current.trim()) {
    values.push(current.trim());
  }

  return values;
}

// Unescape MySQL string values
function unescapeSQL(str) {
  if (!str || str === 'NULL') return '';
  return str
    .replace(/\\'/g, "'")
    .replace(/\\"/g, '"')
    .replace(/\\\\/g, '\\')
    .replace(/\\n/g, '\n')
    .replace(/\\r/g, '\r')
    .replace(/\\t/g, '\t')
    .replace(/\\0/g, '\0');
}

// Process WP image URLs to local paths
function processContent(html) {
  if (!html) return html;
  return html
    .replace(/https?:\/\/(?:www\.)?cheapestcarinsurancetulsa\.com\/wp-content\/uploads/g, '/wp-content/uploads');
}

function extractFromSQL() {
  console.log('Reading SQL dump...');
  const sql = fs.readFileSync(SQL_FILE, 'utf-8');

  // Find all INSERT INTO wp_posts statements
  const insertPattern = new RegExp(
    `INSERT INTO \`${TABLE_PREFIX}posts\` VALUES \\((.+?)\\);`,
    'g'
  );

  const wpPosts = [];
  let match;

  // Process line by line to handle the massive file
  const lines = sql.split('\n');
  console.log(`Processing ${lines.length} lines...`);

  for (const line of lines) {
    if (!line.startsWith(`INSERT INTO \`${TABLE_PREFIX}posts\``)) continue;

    // Extract the VALUES portion
    const valuesMatch = line.match(/VALUES \((.+)\);$/);
    if (!valuesMatch) continue;

    const values = parseValuesRow(valuesMatch[1]);
    if (values.length < POST_COLUMNS.length) continue;

    const row = {};
    POST_COLUMNS.forEach((col, idx) => {
      row[col] = values[idx];
    });

    wpPosts.push(row);
  }

  console.log(`Found ${wpPosts.length} total wp_posts rows`);

  // Filter for published posts and pages
  const publishedPosts = wpPosts.filter(
    p => unescapeSQL(p.post_status) === 'publish' && unescapeSQL(p.post_type) === 'post'
  );
  const publishedPages = wpPosts.filter(
    p => unescapeSQL(p.post_status) === 'publish' && unescapeSQL(p.post_type) === 'page'
  );

  console.log(`Published posts: ${publishedPosts.length}`);
  console.log(`Published pages: ${publishedPages.length}`);

  // Also extract term_relationships and term_taxonomy for categories/tags
  const termRelationships = extractTermRelationships(lines);
  const termTaxonomies = extractTermTaxonomies(lines);

  // Build post -> category/tag mappings
  const postCategories = {};
  const postTags = {};

  for (const rel of termRelationships) {
    const objectId = parseInt(rel.object_id);
    const termTaxId = parseInt(rel.term_taxonomy_id);
    const taxonomy = termTaxonomies[termTaxId];

    if (taxonomy) {
      if (taxonomy.taxonomy === 'category') {
        if (!postCategories[objectId]) postCategories[objectId] = [];
        postCategories[objectId].push(parseInt(taxonomy.term_id));
      } else if (taxonomy.taxonomy === 'post_tag') {
        if (!postTags[objectId]) postTags[objectId] = [];
        postTags[objectId].push(parseInt(taxonomy.term_id));
      }
    }
  }

  // Convert to our JSON format
  const postsJSON = publishedPosts.map(p => {
    const id = parseInt(unescapeSQL(p.ID));
    return {
      id,
      slug: unescapeSQL(p.post_name),
      date: unescapeSQL(p.post_date),
      modified: unescapeSQL(p.post_modified),
      title: unescapeSQL(p.post_title),
      content: processContent(unescapeSQL(p.post_content)),
      excerpt: unescapeSQL(p.post_excerpt),
      featured_media: 0,
      categories: postCategories[id] || [],
      tags: postTags[id] || [],
      author: parseInt(unescapeSQL(p.post_author)) || 1,
      status: 'publish',
    };
  });

  const pagesJSON = publishedPages.map(p => {
    const id = parseInt(unescapeSQL(p.ID));
    return {
      id,
      slug: unescapeSQL(p.post_name),
      date: unescapeSQL(p.post_date),
      modified: unescapeSQL(p.post_modified),
      title: unescapeSQL(p.post_title),
      content: processContent(unescapeSQL(p.post_content)),
      excerpt: unescapeSQL(p.post_excerpt),
      featured_media: 0,
      parent: parseInt(unescapeSQL(p.post_parent)) || 0,
      menu_order: parseInt(unescapeSQL(p.menu_order)) || 0,
      author: parseInt(unescapeSQL(p.post_author)) || 1,
      status: 'publish',
    };
  });

  // Now merge with existing content
  mergeContent(postsJSON, pagesJSON);

  // Print all post slugs for redirect generation
  console.log('\n=== All WordPress Post Slugs (for redirects) ===');
  postsJSON.forEach(p => console.log(`  /${p.slug}/ -> /blog/${p.slug}`));

  console.log('\n=== All WordPress Page Slugs ===');
  pagesJSON.forEach(p => console.log(`  /${p.slug}/`));
}

function extractTermRelationships(lines) {
  const relationships = [];
  const pattern = `INSERT INTO \`${TABLE_PREFIX}term_relationships\``;

  for (const line of lines) {
    if (!line.startsWith(pattern)) continue;
    const valuesMatch = line.match(/VALUES \((.+)\);$/);
    if (!valuesMatch) continue;
    const values = parseValuesRow(valuesMatch[1]);
    if (values.length >= 3) {
      relationships.push({
        object_id: values[0],
        term_taxonomy_id: values[1],
        term_order: values[2],
      });
    }
  }

  console.log(`Found ${relationships.length} term relationships`);
  return relationships;
}

function extractTermTaxonomies(lines) {
  const taxonomies = {};
  const pattern = `INSERT INTO \`${TABLE_PREFIX}term_taxonomy\``;

  for (const line of lines) {
    if (!line.startsWith(pattern)) continue;
    const valuesMatch = line.match(/VALUES \((.+)\);$/);
    if (!valuesMatch) continue;
    const values = parseValuesRow(valuesMatch[1]);
    if (values.length >= 4) {
      const id = parseInt(values[0]);
      taxonomies[id] = {
        term_taxonomy_id: id,
        term_id: values[1],
        taxonomy: unescapeSQL(values[2]),
        description: unescapeSQL(values[3]),
      };
    }
  }

  console.log(`Found ${Object.keys(taxonomies).length} term taxonomies`);
  return taxonomies;
}

function mergeContent(sqlPosts, sqlPages) {
  // Load existing content
  const existingPostsPath = path.join(CONTENT_DIR, 'posts.json');
  const existingPagesPath = path.join(CONTENT_DIR, 'pages.json');

  const existingPosts = JSON.parse(fs.readFileSync(existingPostsPath, 'utf-8'));
  const existingPages = JSON.parse(fs.readFileSync(existingPagesPath, 'utf-8'));

  console.log(`\nExisting posts: ${existingPosts.length}`);
  console.log(`Existing pages: ${existingPages.length}`);
  console.log(`SQL posts: ${sqlPosts.length}`);
  console.log(`SQL pages: ${sqlPages.length}`);

  // Build slug maps from existing content (these are from API and may be higher quality)
  const existingPostSlugs = new Set(existingPosts.map(p => p.slug));
  const existingPageSlugs = new Set(existingPages.map(p => p.slug));

  // Find new posts from SQL that aren't in existing content
  const newPosts = sqlPosts.filter(p => !existingPostSlugs.has(p.slug));
  const newPages = sqlPages.filter(p => !existingPageSlugs.has(p.slug));

  console.log(`\nNew posts to add: ${newPosts.length}`);
  console.log(`New pages to add: ${newPages.length}`);

  if (newPosts.length > 0) {
    console.log('\nNew post slugs:');
    newPosts.forEach(p => console.log(`  - ${p.slug}`));
  }

  if (newPages.length > 0) {
    console.log('\nNew page slugs:');
    newPages.forEach(p => console.log(`  - ${p.slug}`));
  }

  // Merge: existing content takes priority (from API, higher quality)
  // Add new content from SQL dump that wasn't in API
  const mergedPosts = [...existingPosts, ...newPosts];
  const mergedPages = [...existingPages, ...newPages];

  // Sort posts by date descending
  mergedPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  mergedPages.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Write merged content
  fs.writeFileSync(existingPostsPath, JSON.stringify(mergedPosts, null, 2));
  fs.writeFileSync(existingPagesPath, JSON.stringify(mergedPages, null, 2));

  console.log(`\nFinal posts: ${mergedPosts.length}`);
  console.log(`Final pages: ${mergedPages.length}`);

  // Write all slugs to a file for redirect generation
  const allSlugs = {
    posts: sqlPosts.map(p => p.slug),
    pages: sqlPages.map(p => p.slug),
  };
  fs.writeFileSync(
    path.join(__dirname, 'wp-slugs.json'),
    JSON.stringify(allSlugs, null, 2)
  );
  console.log('\nSaved all WordPress slugs to scripts/wp-slugs.json');
}

extractFromSQL();
