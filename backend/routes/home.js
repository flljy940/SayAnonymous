const express = require('express');
const router = express.Router();
const { getTrendingPosts, getNewPosts } = require('../controller/home');
const { auth } = require('../middleware/auth');

// router.get('/', auth, getHomePage);
router.get('/top', auth, getTrendingPosts);
router.get('/new', auth, getNewPosts);

module.exports = router;
