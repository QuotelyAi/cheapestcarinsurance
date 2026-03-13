# Blog API Endpoints Documentation

This document describes the blog CRUD API endpoints implemented for the admin interface.

## Base URL
```
http://localhost:3000/api/admin/blogs
```

## Endpoints

### 1. GET /api/admin/blogs
**List blog posts with pagination**

#### Query Parameters
- `page` (optional, default: 1) - Page number for pagination
- `per_page` (optional, default: 20, max: 100) - Posts per page

#### Response (200 OK)
```json
{
  "posts": [
    {
      "id": 1234567890,
      "slug": "example-post",
      "date": "2026-03-13T12:00:00.000Z",
      "modified": "2026-03-13T12:00:00.000Z",
      "title": "Example Post",
      "content": "<p>Post content here</p>",
      "excerpt": "Short excerpt",
      "featured_media": 0,
      "categories": [1, 2],
      "tags": [3, 4],
      "author": 1,
      "status": "draft"
    }
  ],
  "total": 85,
  "page": 1,
  "perPage": 20
}
```

#### Error Response (500 Internal Server Error)
```json
{
  "error": "Failed to read posts"
}
```

#### Example cURL
```bash
curl http://localhost:3000/api/admin/blogs?page=1&per_page=10
```

---

### 2. POST /api/admin/blogs
**Create a new blog post**

#### Request Body
```json
{
  "title": "My New Post",
  "content": "<p>Post content here</p>",
  "excerpt": "Short excerpt (optional)",
  "slug": "my-new-post",
  "categories": [1, 2],
  "tags": [3, 4],
  "author": 1,
  "featured_media": 0,
  "status": "draft"
}
```

**Notes:**
- `slug` is optional - will be auto-generated from title if not provided
- `excerpt`, `featured_media`, `author`, and `status` are optional
- `title`, `content`, and `slug` are required (after auto-generation)
- New post is inserted at the beginning of the array
- ID and timestamps are auto-generated

#### Response (201 Created)
```json
{
  "id": 1234567890,
  "slug": "my-new-post",
  "date": "2026-03-13T12:00:00.000Z",
  "modified": "2026-03-13T12:00:00.000Z",
  "title": "My New Post",
  "content": "<p>Post content here</p>",
  "excerpt": "Short excerpt",
  "featured_media": 0,
  "categories": [1, 2],
  "tags": [3, 4],
  "author": 1,
  "status": "draft"
}
```

#### Error Responses

**400 Bad Request** - Validation error
```json
{
  "error": "Validation failed",
  "errors": {
    "title": "Title is required",
    "content": "Content is required"
  }
}
```

**400 Bad Request** - Invalid JSON
```json
{
  "error": "Invalid JSON in request body"
}
```

**409 Conflict** - Slug already exists
```json
{
  "error": "Slug already exists"
}
```

**500 Internal Server Error**
```json
{
  "error": "Failed to create post"
}
```

#### Example cURL
```bash
curl -X POST http://localhost:3000/api/admin/blogs \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My New Post",
    "content": "<p>Content here</p>",
    "categories": [1],
    "tags": [2]
  }'
```

---

### 3. PUT /api/admin/blogs/[id]
**Update a blog post**

#### URL Parameters
- `id` (required) - Post ID (numeric timestamp)

#### Request Body
```json
{
  "title": "Updated Title",
  "content": "<p>Updated content</p>",
  "excerpt": "Updated excerpt",
  "slug": "updated-slug",
  "categories": [1, 2],
  "tags": [3, 4],
  "author": 1,
  "featured_media": 0,
  "status": "published"
}
```

**Notes:**
- All fields are optional for updates
- Original `id` and `date` are preserved
- `modified` timestamp is automatically updated
- If slug is changed, duplicate slug check is performed

#### Response (200 OK)
```json
{
  "id": 1234567890,
  "slug": "updated-slug",
  "date": "2026-03-13T10:00:00.000Z",
  "modified": "2026-03-13T12:30:00.000Z",
  "title": "Updated Title",
  "content": "<p>Updated content</p>",
  "excerpt": "Updated excerpt",
  "featured_media": 0,
  "categories": [1, 2],
  "tags": [3, 4],
  "author": 1,
  "status": "published"
}
```

#### Error Responses

**400 Bad Request** - Invalid ID or validation error
```json
{
  "error": "Invalid post ID"
}
```

**400 Bad Request** - Validation error
```json
{
  "error": "Validation failed",
  "errors": {
    "title": "Title must not exceed 255 characters"
  }
}
```

**404 Not Found**
```json
{
  "error": "Post not found"
}
```

**409 Conflict** - Slug already exists
```json
{
  "error": "Slug already exists"
}
```

**500 Internal Server Error**
```json
{
  "error": "Failed to update post"
}
```

#### Example cURL
```bash
curl -X PUT http://localhost:3000/api/admin/blogs/1234567890 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Title",
    "excerpt": "New excerpt"
  }'
```

---

### 4. DELETE /api/admin/blogs/[id]
**Delete a blog post**

#### URL Parameters
- `id` (required) - Post ID (numeric timestamp)

#### Response (200 OK)
```json
{
  "success": true
}
```

#### Error Responses

**400 Bad Request** - Invalid ID
```json
{
  "error": "Invalid post ID"
}
```

**404 Not Found**
```json
{
  "error": "Post not found"
}
```

**500 Internal Server Error**
```json
{
  "error": "Failed to delete post"
}
```

#### Example cURL
```bash
curl -X DELETE http://localhost:3000/api/admin/blogs/1234567890
```

---

## Validation Rules

All blog posts are validated using the `validateBlogPost` function from `lib/blog-utils.ts`:

### Required Fields
- `title` - Must be present and non-empty (max 255 characters)
- `content` - Must be present and non-empty
- `slug` - Must be present and valid format (lowercase letters, numbers, hyphens only)

### Optional Fields
- `excerpt` - Max 500 characters (can be empty)
- `categories` - Must be an array if provided
- `tags` - Must be an array if provided
- `author` - Numeric ID
- `featured_media` - Numeric ID
- `status` - String (e.g., "draft", "published")

---

## File Operations

All endpoints operate on `content/posts.json`:

- **GET**: Reads and parses the JSON file, applies pagination
- **POST**: Reads file, validates, adds new post at beginning, writes back
- **PUT**: Reads file, finds post by ID, updates fields, validates, writes back
- **DELETE**: Reads file, removes post by ID, writes back

All file writes use `JSON.stringify(posts, null, 2)` for pretty-printing.

---

## Testing

Run the included test script to verify all endpoints:

```bash
# Start the dev server first
npm run dev

# In another terminal, run the test script
bash test-api.sh
```

Or test manually with individual cURL commands as shown above.

---

## Implementation Details

### Files Created
1. `src/app/api/admin/blogs/route.ts` - GET and POST endpoints
2. `src/app/api/admin/blogs/[id]/route.ts` - PUT and DELETE endpoints

### Dependencies
- Next.js 14 App Router
- `fs/promises` for async file operations
- `@/lib/blog-utils` - Validation and utility functions
- `@/lib/wordpress` - WPPost type definition

### Error Handling
- All errors are logged to console with `console.error()`
- Graceful JSON error responses with appropriate HTTP status codes
- File read errors in POST endpoint default to empty array (allows creation even if file missing)
