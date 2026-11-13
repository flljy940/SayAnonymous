const router = require('express').Router();
const { auth } = require('../middleware/auth');
const { requirePost } = require('../lib/feed');
const c = require('../controller/comments');
router.get('/:postId', requirePost, c.getComments);
router.post('/:postId', auth, requirePost, c.addComment);
router.put('/:commentId', auth, c.editComment);
router.delete('/delete/:commentId', auth, c.deleteComment);
module.exports = router;
