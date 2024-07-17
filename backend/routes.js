const express = require('express');

const auth = require('./routes/auth');
const profile = require('./routes/profile');
const exp = require('./routes/exp');
const post = require('./routes/post');
const trending = require('./routes/trending');
const search = require('./routes/search');
const suggestions = require('./routes/suggestion');
const notifications = require('./routes/notifications');
const comments = require('./routes/comments');
const likes = require('./routes/likes');
const stats = require('./routes/stats');
const feedback = require('./routes/feedback');
const homePage = require('./routes/home');
const { createPool } = require('mysql2');

const router = express.Router();

router.use('/auth', auth);
router.use('/profile', profile);
router.use('/', exp);
router.use('/post', post);
router.use('/trending', trending);
router.use('/search', search);
router.use('/suggestions', suggestions);
router.use('/notifications', notifications);
router.use('/comments', comments);
router.use('/', likes);
router.use('/stats', stats);
router.use('/feedback', feedback);
router.use('/home', homePage);

module.exports = router;
