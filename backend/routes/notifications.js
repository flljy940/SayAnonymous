const express = require('express');
const { sendNotification, getUserNotifications, readNotifications } = require('../controller/notifications');

const router = express.Router();

router.post('/send', sendNotification);
router.get('/:userId', getUserNotifications);
router.put('/read/:notificationId', readNotifications);

module.exports = router;
