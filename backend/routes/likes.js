const express = require('express');
const router = express.Router();
const { likePost } = require('../controller/likes');

// Route to like a post
router.post('/:userId/likes/:postId', likePost);

module.exports = router;
