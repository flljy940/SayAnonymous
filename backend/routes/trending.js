const express = require('express');
const router = express.Router();
const { getTrendingTopics, getTrendingPosts } = require('../controller/trending');

router.get('/topics', getTrendingTopics);
router.get('/posts', getTrendingPosts);

module.exports = router;
