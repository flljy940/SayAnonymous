const router = require('express').Router();
const { auth } = require('../middleware/auth');
const { requirePost } = require('../lib/feed');
const c = require('../controller/likes');
router.get('/:postId/likes', requirePost, c.getPostLikes);
router.post('/like/:postId', auth, requirePost, c.likePost);
router.post('/unlike/:postId', auth, requirePost, c.unlikePost);
module.exports = router;
