# Simple Headless CMS

This is a simple, file-based headless CMS built with Node.js and Express. It provides a basic API for managing content.

## Prerequisites

- Node.js (v14 or higher)
- npm

## Installation

1. Clone the repository.
2. Install the dependencies:
   ```bash
   npm install
   ```

## Running the Server

To start the server, run the following command:
```bash
node index.js
```
The server will start on `http://localhost:3000`.

## API Endpoints

The CMS provides a RESTful API for managing "posts".

### Post Model
A post has the following structure:
```json
{
  "id": "string (auto-generated)",
  "title": "string",
  "content": "string"
}
```

### Endpoints

- `GET /api/posts`: Get all posts.
- `POST /api/posts`: Create a new post.
  - **Request Body:** `{ "title": "string", "content": "string" }`
- `GET /api/posts/:id`: Get a single post by its ID.
- `PUT /api/posts/:id`: Update a post by its ID.
  - **Request Body:** `{ "title": "string", "content": "string" }`
- `DELETE /api/posts/:id`: Delete a post by its ID.
