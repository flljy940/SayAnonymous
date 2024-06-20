const express = require('express');
const router = express.Router();
const { createPost, editPost, deletePost, getPost, getPosts, savePost } = require('../controller/post');

// Create a new post
router.post('/', createPost);

// Edit a post
router.put('/:postId', editPost);

// Delete a post
router.delete('/:postId', deletePost);

// Get a specific post
router.get('/:postId', getPost);

// Get all posts
router.get('/', getPosts);

// Save a posts
router.post('/save', savePost);

module.exports = router;
