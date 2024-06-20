const express = require('express');

const auth = require('./routes/auth');
const profile = require('./routes/profile');
const exp = require('./routes/exp');
const post = require('./routes/post');
const trending = require('./routes/trending');
const search = require('./routes/search');
const suggested = require('./routes/suggested');
const notifications = require('./routes/notifications');
const { createPool } = require('mysql2');

const router = express.Router();

router.use('/auth', auth);
router.use('/profile', profile);
router.use('/', exp);
router.use('/posts', post);
router.use('/trending', trending);
router.use('/search', search);
router.use('/', suggested);
router.use('/notifications', notifications);

module.exports = router;
