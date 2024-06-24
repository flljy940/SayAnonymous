const express = require('express');
const { setupProfile, getProfile, deleteUser, getUserPosts, updateProfilePic } = require('../controller/profile');
const { auth } = require('../middleware/auth');

const router = express.Router();

router.put('/:userId', auth, setupProfile);
router.get('/:userId', auth, getProfile);
// router.get('/my', auth, getMyProfile);
router.put('/profile-picture', auth, updateProfilePic)
router.delete('/:userId', auth, deleteUser);
// router.get('/rewards/:userId', getUserRewards);
router.get('/:userId/posts', auth, getUserPosts);
router.get('/my-posts', auth, getUserPosts);

module.exports = router;
