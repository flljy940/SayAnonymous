const express = require('express');
const { login, register } = require('../controller/auth');
const { auth } = require('../middleware/auth');

const router = express.Router();

router.post('/login', auth, login);
router.post('/register', auth, register);

module.exports = router;
