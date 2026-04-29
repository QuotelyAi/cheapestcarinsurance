#!/usr/bin/env node

/**
 * Generate review article content using direct API calls
 * Reads API key from .env.local and updates generated-reviews.json
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// Read API key from .env.local
function getApiKey() {
  const envPath = path.join(__dirname, '../.env.local');
  const envContent = fs.readFileSync(envPath, 'utf8');
  const match = envContent.match(/Anthropic_API_Key=(.+)/);
  return match ? match[1].trim() : null;
}

// Make API call to Anthropic
async function generateContent(prompt, apiKey) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1024,
      messages: [{
        role: 'user',
        content: prompt
      }]
    });

    const options = {
      hostname: 'api.anthropic.com',
      path: '/v1/messages',
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json'
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          const result = JSON.parse(body);
          if (result.error) {
            reject(new Error(`API Error: ${result.error.message}`));
          } else if (result.content && result.content[0]) {
            resolve(result.content[0].text);
          } else {
            console.error('Response:', JSON.stringify(result).substring(0, 500));
            reject(new Error('Invalid response format'));
          }
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

// Load existing posts
function loadPosts() {
  const data = fs.readFileSync(path.join(__dirname, '../content/posts.json'), 'utf8');
  return JSON.parse(data);
}

// Main function
async function updateReviewContent() {
  console.log('📝 Generating Review Article Content\n');

  const apiKey = getApiKey();
  if (!apiKey) {
    console.error('❌ API key not found in .env.local');
    process.exit(1);
  }

  console.log(`✓ API key found`);

  // Load articles
  const posts = loadPosts();
  const reviewsPath = path.join(__dirname, '../content/generated-reviews.json');
  const reviews = JSON.parse(fs.readFileSync(reviewsPath, 'utf8'));

  console.log(`✓ Loaded ${reviews.length} articles to update\n`);

  // Generate content for each review
  for (let i = 0; i < reviews.length; i++) {
    const review = reviews[i];
    const originalPost = posts.find(p => p.id === review.original_post_id);

    process.stdout.write(`\r[${i + 1}/${reviews.length}] Generating content...`);

    const prompt = review.review_type === 'expansion'
      ? `You are an expert insurance reviewer. Write a comprehensive review article expanding on "${review.title}".

Context: This expands on the original article about "${originalPost?.title || review.title}".

Write 600-800 words covering:
- New perspectives not in the original
- Practical tips for Oklahoma drivers
- Expert recommendations
- Relevant market data

Follow insurance compliance (no guaranteed savings claims). Use professional tone.

Start writing now (article body only, no title):`

      : `You are an insurance expert providing 2025 commentary. Write "${review.title}".

Context: This updates readers on "${originalPost?.title || review.title}".

Write 600-800 words covering:
- What has changed since original article
- 2025 market updates relevant to Oklahoma
- New regulations or industry shifts
- Expert analysis and recommendations

Follow insurance compliance. Use professional tone.

Start writing now (article body only, no title):`;

    try {
      const content = await generateContent(prompt, apiKey);
      review.content = content;

      // Save progress every 10 articles
      if ((i + 1) % 10 === 0) {
        fs.writeFileSync(reviewsPath, JSON.stringify(reviews, null, 2));
      }

      // Rate limiting
      await new Promise(resolve => setTimeout(resolve, 1500));
    } catch (error) {
      console.error(`\n❌ Error on article ${i + 1}: ${error.message}`);
    }
  }

  // Final save
  fs.writeFileSync(reviewsPath, JSON.stringify(reviews, null, 2));

  console.log(`\n\n✅ Content generation complete!`);
  console.log(`📊 Updated ${reviews.length} articles with actual content`);

  // Update posts.json
  const allPosts = [...posts, ...reviews];
  const postsPath = path.join(__dirname, '../content/posts.json');
  fs.writeFileSync(postsPath, JSON.stringify(allPosts, null, 2));

  console.log(`✓ Updated posts.json with ${reviews.length} new articles`);
  console.log(`📈 Total articles: ${allPosts.length}`);
}

// Execute
updateReviewContent().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
