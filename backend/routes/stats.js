const express = require('express');
const router = express.Router();
const { getUserActivityStats, getPostEngagementStats, getGeneralStats } = require('../controller/stats');
const authenticate = require('../middleware/authenticate');

router.get('/user/:userId', authenticate, getUserActivityStats);
router.get('/post/:postId', authenticate, getPostEngagementStats);
router.get('/general', authenticate, getGeneralStats);

module.exports = router;
