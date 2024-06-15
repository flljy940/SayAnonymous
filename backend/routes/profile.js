const express = require('express');
const { setupProfile, getProfile, getUserRewards } = require('../controllers/profileController');

const router = express.Router();

router.post('/setupProfile', setupProfile);
router.get('/profile/:userId', getProfile);
router.get('/rewards/:userId', getUserRewards);

module.exports = router;
