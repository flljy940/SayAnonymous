const express = require('express');
const router = express.Router();
const { addComment, editComment, deleteComment, getComments } = require('../controller/comments');
const { authenticate } = require('../middleware/authenticate');

// Add a comment
router.post('/', authenticate, addComment);

// Edit a comment
router.put('/:commentId', authenticate, editComment);

// Delete a comment
router.delete('/delete/:commentId', authenticate, deleteComment);

// Get comments for a post
router.get('/:postId', authenticate, getComments);

module.exports = router;
