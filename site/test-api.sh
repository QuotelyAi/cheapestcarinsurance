#!/bin/bash

# Test API endpoints for blog CRUD operations
# This script can be run after starting the dev server with `npm run dev`

API_URL="http://localhost:3000/api/admin/blogs"

echo "===== Blog API Tests ====="
echo ""

# Test 1: GET - List posts with default pagination
echo "TEST 1: GET /api/admin/blogs (default pagination)"
curl -s "$API_URL" | jq . | head -50
echo ""
echo ""

# Test 2: POST - Create a new blog post
echo "TEST 2: POST /api/admin/blogs (create new post)"
NEW_POST=$(curl -s -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Blog Post",
    "content": "<p>This is a test blog post for the CRUD API endpoints.</p>",
    "excerpt": "Test excerpt",
    "categories": [1, 2],
    "tags": [3, 4],
    "author": 1,
    "featured_media": 0
  }')

echo "$NEW_POST" | jq .
NEW_POST_ID=$(echo "$NEW_POST" | jq -r '.id')
echo "Created post with ID: $NEW_POST_ID"
echo ""
echo ""

# Test 3: GET - Paginated list
echo "TEST 3: GET /api/admin/blogs?page=1&per_page=5"
curl -s "$API_URL?page=1&per_page=5" | jq . | head -30
echo ""
echo ""

# Test 4: PUT - Update the created post
echo "TEST 4: PUT /api/admin/blogs/$NEW_POST_ID (update post)"
curl -s -X PUT "$API_URL/$NEW_POST_ID" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Test Blog Post",
    "content": "<p>This is an updated test blog post.</p>",
    "excerpt": "Updated excerpt"
  }' | jq .
echo ""
echo ""

# Test 5: DELETE - Delete the created post
echo "TEST 5: DELETE /api/admin/blogs/$NEW_POST_ID"
curl -s -X DELETE "$API_URL/$NEW_POST_ID" | jq .
echo ""
echo ""

# Test 6: GET - Verify deletion
echo "TEST 6: GET /api/admin/blogs/$NEW_POST_ID (should return 404 if client-side filtered)"
curl -s -X DELETE "$API_URL/$NEW_POST_ID" | jq .
echo ""
echo ""

# Test 7: POST - Test validation error (missing content)
echo "TEST 7: POST /api/admin/blogs (validation error - missing content)"
curl -s -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Invalid Post",
    "excerpt": "No content provided"
  }' | jq .
echo ""
echo ""

# Test 8: POST - Test duplicate slug error
echo "TEST 8: POST /api/admin/blogs (duplicate slug test)"
curl -s -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Blog Post",
    "content": "<p>Another test post.</p>",
    "excerpt": "Another excerpt",
    "slug": "test-blog-post"
  }' | jq .
echo ""
echo ""

echo "===== Tests Complete ====="
