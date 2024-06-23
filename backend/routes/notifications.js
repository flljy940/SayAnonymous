const express = require('express');
const { sendNotification, getUserNotifications, readNotifications } = require('../controller/notifications');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

router.post('/send', sendNotification);
router.get('/', authenticate, getUserNotifications);
router.put('/read/:notificationId', readNotifications);

module.exports = router;
