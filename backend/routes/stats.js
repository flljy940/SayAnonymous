const router = require('express').Router();
const { auth } = require('../middleware/auth');
const c = require('../controller/stats');
router.get('/general', c.getGeneralStats);
router.get('/me', auth, c.getUserStats);
module.exports = router;
