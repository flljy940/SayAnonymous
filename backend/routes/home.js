const express = require('express');
const router = express.Router();
const { getHomePage, getTrendingPosts, getNewPosts } = require('../controller/home');
const { authenticate } = require('../middleware/authenticate');

router.get('/', authenticate, getHomePage);
router.get('/trending', authenticate, getTrendingPosts);
router.get('/new', authenticate, getNewPosts);

module.exports = router;
