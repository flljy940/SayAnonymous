const express = require('express');
const multer = require('multer');
const router = express.Router();
const { createPost, editPost, deletePost, getPosts, savePost, unsavePost, getSavedPosts, unsavedPost } = require('../controller/post');
const { auth } = require('../middleware/auth');
const upload = multer({ dest: 'uploads/' });

// Create a new post
router.post('/create', auth, upload.single('image'), createPost);

// Edit a post
router.put('/edit/:postId', auth, editPost);

// Delete a post
router.delete('/:postId', auth, deletePost);

// Get all posts
router.get('/posts', auth, getPosts);

// Save a posts
router.post('/save/:postId', auth, savePost);

// Unsave a post
router.delete('/unsave/:postId', auth, unsavePost);

// Get saved posts
router.get('/posts/saved', auth, getSavedPosts);

module.exports = router;
