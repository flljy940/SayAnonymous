const pool = require('../db');

const createNotification = async (userId, message, type) => {
    const query = 'INSERT INTO notifications (user_id, message, type) VALUES (?, ?, ?)';
    try {
        await pool.execute(query, [userId, message, type]);
    } catch (error) {
        console.error('Error creating notification:', error);
        throw error;
    }
};

const getUserNotifications = async (req, res) => {
    const userId = req.user.id;
    const query = 'SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC';
    try { 
        const notifications = await pool.execute(query, [userId]);
        res.status(200).json(notifications);
    } catch (error) {
        console.error('Error getting notifications:', error);
        res.status(500).json({ error: 'Failed to get notifications' });
    }
};

const markAsRead = async (req, res) => {
    const notificationId = req.params;
    const query = 'UPDATE notifications SET is_read = TRUE WHERE id = ?';
    try {
        await pool.execute(query, [notificationId]);
        res.status(200).json({ message: 'Notification marked as read' });
    } catch (error) {
        console.error('Error marking notification as read:', error);
        res.status(500).json({ error: 'Failed to mark notification as read' });
    }
};

module.exports = { createNotification, getUserNotifications, markAsRead };
