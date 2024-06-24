const express = require('express');
const router = express.Router();
const { getUserActivityStats, getPostEngagementStats, getGeneralStats, getUserStats, getPostStats } = require('../controller/stats');
const { auth } = require('../middleware/auth');

router.get('/user-activity/:userId', auth, getUserActivityStats);
router.get('/post-engagement/:postId', auth, getPostEngagementStats);
router.get('/general', auth, getGeneralStats);
router.get('/user/:userId', auth, getUserStats);
router.get('/post/:postId', auth, getPostStats);

module.exports = router;
