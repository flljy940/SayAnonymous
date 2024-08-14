const express = require('express');
const { setupProfile, getProfile, getUserProfile, deleteUser, getMyPosts, getUserPosts, updateProfilePic, getProfilePic } = require('../controller/profile');
const { auth } = require('../middleware/auth');

const router = express.Router();

router.put('/', auth, setupProfile);
router.get('/', auth, getProfile);
router.get('/:userId', auth, getUserProfile);
// router.get('/my', auth, getMyProfile);
router.put('/profile-picture', auth, updateProfilePic)
router.delete('/', auth, deleteUser);
// router.get('/rewards/:userId', getUserRewards);
router.get('/my-posts', auth, getMyPosts)
router.get('/:userId/posts', auth, getUserPosts);
router.get('/my-posts', auth, getUserPosts);
router.get('profile-picture', auth, getProfilePic);

module.exports = router;
