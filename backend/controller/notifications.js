const { response } = require('express');
const pool = require('../db');

const createNotification = async (userId, message, type) => {
    const query = 'INSERT INTO notifications (users_id, message, type, is_read) VALUES (?, ?, ?, ?)';
    try {
        await pool.execute(query, [userId, message, type, false]);
    } catch (error) {
        console.error('Error creating notification:', error);
        throw error;
    }
};

const getNotifications = async (userId) => {
    const query = 'SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC';
    try {
        const [results] = await pool.execute(query, [userId]);
        res.json(results);
    } catch (error) {
        console.error('Error fetching notifications:', error);
        res.status(500).json({ message: 'Failed to get notifications' });
    }
};

const markAsRead = async (notificationId) => {
    const query = 'UPDATE notifications SET is_read = TRUE WHERE id = ?';
    try {
        await pool.execute(query, [notificationId]);
    } catch (error) {
        console.error('Error marking notification as read:', error);
        throw error;
    }
};

const sendNotification = async (req, res) => {
    const { userId, message, type } = req.body;
    try {
        await createNotification(userId, message, type);
        res.json({ message: 'Notification sent successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to send notification' });
    }
};

const getUserNotifications = async (req, res) => {
    const userId = req.params.userId;
    try { 
        const notifications = await getNotifications(userId);
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch notifications' });
    }
};

const readNotifications = async (req, res) => {
    const notificationId = req.params.notificationId;
    try {
        await markAsRead(notificationId);
        res.json({ message: 'Notification marked as read' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to mark notification as read' });
    }
};

module.exports = { sendNotification, getUserNotifications, readNotifications };
