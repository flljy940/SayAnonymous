const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const { likePost, unlikePost, getPostLikes } = require('../controller/likes');

router.post('/like/:postId', auth, likePost);
router.post('/unlike/:postId', auth, unlikePost);
router.get('/:postId/likes', auth, getPostLikes);

module.exports = router;
