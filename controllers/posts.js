const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const postsFilePath = path.join(__dirname, '../data/posts.json');

// Helper function to read data
const readPosts = () => {
  if (!fs.existsSync(postsFilePath)) {
    return [];
  }
  const data = fs.readFileSync(postsFilePath);
  return JSON.parse(data);
};

// Helper function to write data
const writePosts = (data) => {
  fs.writeFileSync(postsFilePath, JSON.stringify(data, null, 2));
};

const getAllPosts = (req, res) => {
  const posts = readPosts();
  res.json(posts);
};

const createPost = (req, res) => {
  const posts = readPosts();
  const newPost = {
    id: crypto.randomBytes(16).toString("hex"),
    ...req.body
  };
  posts.push(newPost);
  writePosts(posts);
  res.status(201).json(newPost);
};

const getPostById = (req, res) => {
  const posts = readPosts();
  const post = posts.find(p => p.id === req.params.id);
  if (post) {
    res.json(post);
  } else {
    res.status(404).send('Post not found');
  }
};

const updatePost = (req, res) => {
  const posts = readPosts();
  const index = posts.findIndex(p => p.id === req.params.id);
  if (index !== -1) {
    const updatedPost = { ...posts[index], ...req.body };
    posts[index] = updatedPost;
    writePosts(posts);
    res.json(updatedPost);
  } else {
    res.status(404).send('Post not found');
  }
};

const deletePost = (req, res) => {
  const posts = readPosts();
  const newPosts = posts.filter(p => p.id !== req.params.id);
  if (posts.length !== newPosts.length) {
    writePosts(newPosts);
    res.status(204).send();
  } else {
    res.status(404).send('Post not found');
  }
};

module.exports = {
  getAllPosts,
  createPost,
  getPostById,
  updatePost,
  deletePost,
};
