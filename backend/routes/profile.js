const express = require('express');
const { setupProfile, getProfile, deleteUser, getUserPosts } = require('../controller/profile');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

router.put('/setup/:userId', authenticate, setupProfile);
router.get('/:userId', authenticate, getProfile);
router.delete('/delete/:userId', authenticate, deleteUser);
// router.get('/rewards/:userId', getUserRewards);
router.get('/:userId/posts', authenticate, getUserPosts);

module.exports = router;
