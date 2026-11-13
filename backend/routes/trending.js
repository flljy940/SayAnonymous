const router = require('express').Router();
const c = require('../controller/trending');
router.get('/topics', c.getTrendingTopics);
router.get('/posts', c.getTrendingPosts);
module.exports = router;
