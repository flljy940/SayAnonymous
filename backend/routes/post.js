const express = require('express');
const router = express.Router();
const { createPost, editPost, deletePost, getPost, getPosts, savePost, getSavedPosts } = require('../controller/post');
const authenticate = require('../middleware/authenticate');

// Create a new post
router.post('/', authenticate, createPost);

// Edit a post
router.put('/:postId', authenticate, editPost);

// Delete a post
router.delete('/:postId', authenticate, deletePost);

// Get a specific post
router.get('/:postId', authenticate, getPost);

// Get all posts
router.get('/', authenticate, getPosts);

// Save a posts
router.post('/save/:postId', authenticate, savePost);

// Get saved posts
router.get('/:userId/saved', authenticate, getSavedPosts);

module.exports = router;
