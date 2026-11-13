const pool = require('../db');
const { text, id } = require('../lib/validation');
const { recordActivity } = require('./exp');
const { createNotification } = require('./notifications');
async function getComments(req, res, next) {
  try {
    const [rows] = await pool.execute(`SELECT c.id, c.comment, c.created_at, c.user_id, u.pseudonym, u.username, u.avatar
      FROM comments c JOIN users u ON u.id = c.user_id WHERE c.post_id = ? ORDER BY c.id ASC LIMIT 200`, [req.post.id]);
    res.json(rows.map(c => ({ id: c.id, comment: c.comment, time: c.created_at, username: c.pseudonym || c.username, avatar: c.avatar, isOwner: c.user_id === req.user?.id })));
  } catch (error) { next(error); }
}
async function addComment(req, res, next) {
  if (!text(req.body.comment, 500)) return res.status(400).json({ message: 'Write a reply of 1–500 characters.' });
  try {
    const [result] = await pool.execute('INSERT INTO comments (post_id, user_id, comment) VALUES (?, ?, ?)', [req.post.id, req.user.id, req.body.comment.trim()]);
    await recordActivity(req.user.id, 'comment');
    if (req.post.author_id !== req.user.id) await createNotification(req.post.author_id, 'Someone replied to your post.', 'comment');
    res.status(201).json({ id: result.insertId });
  } catch (error) { next(error); }
}
async function changeComment(req, res, next) {
  if (!id(req.params.commentId)) return res.status(400).json({ message: 'Invalid reply.' });
  if (req.method === 'PUT' && !text(req.body.comment, 500)) return res.status(400).json({ message: 'Write a reply of 1–500 characters.' });
  try {
    const [rows] = await pool.execute('SELECT user_id FROM comments WHERE id = ?', [Number(req.params.commentId)]);
    if (!rows[0]) return res.status(404).json({ message: 'Reply not found.' });
    if (rows[0].user_id !== req.user.id) return res.status(403).json({ message: 'You can only change your own replies.' });
    if (req.method === 'PUT') await pool.execute('UPDATE comments SET comment = ? WHERE id = ? AND user_id = ?', [req.body.comment.trim(), Number(req.params.commentId), req.user.id]);
    else await pool.execute('DELETE FROM comments WHERE id = ? AND user_id = ?', [Number(req.params.commentId), req.user.id]);
    res.json({ message: req.method === 'PUT' ? 'Reply updated.' : 'Reply deleted.' });
  } catch (error) { next(error); }
}
module.exports = { getComments, addComment, editComment: changeComment, deleteComment: changeComment };
