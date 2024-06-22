const express = require('express');
const router = express.Router();
const { addComment, editComment, deleteComment, getComments } = require('../controller/comments');

// Add a comment
router.post('/:userId/:postId', addComment);

// Edit a comment
router.put('/:commentId', editComment);

// Delete a comment
router.delete('/:commentId', deleteComment);

// Get comments for a post
router.get('/:postId', getComments);

module.exports = router;
