const express = require('express');
const { getUserNotifications, markAsRead } = require('../controller/notifications');
const { auth } = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, getUserNotifications);
router.put('/:notificationId/read', auth, markAsRead);

module.exports = router;
