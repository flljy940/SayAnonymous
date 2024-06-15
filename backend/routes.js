const express = require('express');

const { login, register } = require('./controller/auth');
const { setupProfile, getProfile, getUserRewards } = require('./controller/profile');
const { recordActivity } = require('./controller/exp');

const router = express.Router();

// Auth routes
router.post('/auth/login', login);
router.post('/auth/register', register);

// Profile routes
router.post('/profile/setup', setupProfile);
router.get('/profile/:userId', getProfile);
router.get('/profile/rewards/:userId', getUserRewards);

// EXP routes
router.post('/exp/activity', recordActivity);

module.exports = router;
