const express = require('express');
const router = express.Router();
const { createPost, editPost, deletePost, getPost, getPosts, savePost, getSavedPosts } = require('../controller/post');

// Create a new post
router.post('/post/:authorId', createPost);

// Edit a post
router.put('/post/:postId', editPost);

// Delete a post
router.delete('/post/:postId/delete', deletePost);

// Get a specific post
router.get('/post/:postId', getPost);

// Get all posts
router.get('/posts', getPosts);

// Save a posts
router.post('/:userId/post/:postId/save', savePost);

// Get saved posts
router.get('/:userId/saved', getSavedPosts);

module.exports = router;
