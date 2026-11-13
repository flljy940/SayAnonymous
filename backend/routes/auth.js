const router = require('express').Router();
const { login, register, demo, logout } = require('../controller/auth');
router.post('/login', login);
router.post('/register', register);
router.post('/demo', demo);
router.post('/logout', logout);
module.exports = router;
