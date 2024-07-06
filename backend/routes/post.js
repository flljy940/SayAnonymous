const express = require('express');
const multer = require('multer');
const router = express.Router();
const { createPost, editPost, deletePost, getPost, getPosts, savePost, getSavedPosts } = require('../controller/post');
const { auth } = require('../middleware/auth');
const upload = multer({ dest: 'uploads/' });

// Create a new post
router.post('/create', auth, upload.single('image'), createPost);

// Edit a post
router.put('/edit/:postId', auth, editPost);

// Delete a post
router.delete('/:postId', auth, deletePost);

// Get a specific post
router.get('/:postId', auth, getPost);

// Get all posts
router.get('/', auth, getPosts);

// Save a posts
router.post('/save/:postId', auth, savePost);

// Get saved posts
router.get('/posts/saved', auth, getSavedPosts);

module.exports = router;
