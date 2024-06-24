const express = require('express');
const router = express.Router();
const { getTrendingTopics, getTrendingPosts } = require('../controller/trending');
const { auth } = require('../middleware/auth');

router.get('/topics', auth, getTrendingTopics);
router.get('/posts', auth, getTrendingPosts);

module.exports = router;
