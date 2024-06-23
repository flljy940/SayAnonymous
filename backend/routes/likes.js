const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/authenticate');
const { likePost, unlikePost, getPostLikes } = require('../controller/likes');

router.post('/:postId', authenticate, likePost);
router.post('/:postId', authenticate, unlikePost);
router.get('/:postId/likes', authenticate, getPostLikes);

module.exports = router;
