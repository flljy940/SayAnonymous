const express = require('express');
const router = express.Router();
const { addComment, editComment, deleteComment, getComments } = require('../controller/comments');
const { auth } = require('../middleware/auth');

// Add a comment
router.post('/:postId', auth, addComment);

// Edit a comment
router.put('/:commentId', auth, editComment);

// Delete a comment
router.delete('/delete/:commentId', auth, deleteComment);

// Get comments for a post
router.get('/:postId', auth, getComments);

module.exports = router;
