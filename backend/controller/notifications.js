const pool = require('../db');
const { id } = require('../lib/validation');
async function createNotification(userId, message, type) {
  await pool.execute('INSERT INTO notifications (user_id, message, type) VALUES (?, ?, ?)', [userId, message, type]);
}
async function getUserNotifications(req, res, next) {
  try {
    const [rows] = await pool.execute('SELECT id, message, type, is_read, created_at FROM notifications WHERE user_id = ? ORDER BY id DESC LIMIT 50', [req.user.id]);
    res.json(rows);
  } catch (error) { next(error); }
}
async function markAsRead(req, res, next) {
  if (!id(req.params.notificationId)) return res.status(400).json({ message: 'Invalid notification.' });
  try {
    const [result] = await pool.execute('UPDATE notifications SET is_read = 1 WHERE id = ? AND user_id = ?', [Number(req.params.notificationId), req.user.id]);
    if (!result.affectedRows) return res.status(404).json({ message: 'Notification not found.' });
    res.json({ message: 'Notification read.' });
  } catch (error) { next(error); }
}
module.exports = { createNotification, getUserNotifications, markAsRead };
