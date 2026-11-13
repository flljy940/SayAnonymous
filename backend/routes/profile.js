const router = require('express').Router();
const { auth } = require('../middleware/auth');
const c = require('../controller/profile');
router.get('/', auth, c.getProfile);
router.put('/', auth, c.setupProfile);
router.get('/my-posts', auth, c.getMyPosts);
router.get('/posts/:userId', c.getUserPosts);
router.get('/:userId', c.getUserProfile);
module.exports = router;
