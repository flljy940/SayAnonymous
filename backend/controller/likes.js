const pool = require('../db');
const { createNotification } = require('./notifications');
async function getPostLikes(req, res, next) {
  try {
    const [rows] = await pool.execute('SELECT COUNT(*) AS likes FROM likes WHERE post_id = ?', [req.post.id]);
    res.json(rows[0]);
  } catch (error) { next(error); }
}
async function likePost(req, res, next) {
  try {
    const [result] = await pool.execute('INSERT OR IGNORE INTO likes (user_id, post_id) VALUES (?, ?)', [req.user.id, req.post.id]);
    if (result.affectedRows && req.post.author_id !== req.user.id) await createNotification(req.post.author_id, 'Someone appreciated your post.', 'like');
    return getPostLikes(req, res, next);
  } catch (error) { next(error); }
}
async function unlikePost(req, res, next) {
  try {
    await pool.execute('DELETE FROM likes WHERE user_id = ? AND post_id = ?', [req.user.id, req.post.id]);
    return getPostLikes(req, res, next);
  } catch (error) { next(error); }
}
module.exports = { getPostLikes, likePost, unlikePost };
