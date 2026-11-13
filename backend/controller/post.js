const pool = require('../db');
const { listPosts, pagination } = require('../lib/feed');
const { text } = require('../lib/validation');
const { topics } = require('../lib/config');
const { recordActivity } = require('./exp');
const fs = require('node:fs');
function removeUpload(file) { if (file) fs.unlink(file.path, () => {}); }
async function createPost(req, res, next) {
  if (!text(req.body.content, 1200) || (req.body.topic && !topics.includes(req.body.topic))) {
    removeUpload(req.file);
    return res.status(400).json({ message: 'Write 1–1,200 characters and choose a valid topic.' });
  }
  try {
    const [result] = await pool.execute('INSERT INTO posts (author_id, content, image, topic) VALUES (?, ?, ?, ?)',
      [req.user.id, req.body.content.trim(), req.file ? `/uploads/${req.file.filename}` : null, req.body.topic || 'Just saying']);
    await recordActivity(req.user.id, 'createPost');
    res.status(201).json({ postId: result.insertId });
  } catch (error) { removeUpload(req.file); next(error); }
}
async function editPost(req, res, next) {
  if (req.post.author_id !== req.user.id) return res.status(403).json({ message: 'You can only edit your own posts.' });
  if (!text(req.body.content, 1200)) return res.status(400).json({ message: 'Write 1–1,200 characters.' });
  try {
    await pool.execute('UPDATE posts SET content = ? WHERE id = ? AND author_id = ?', [req.body.content.trim(), req.post.id, req.user.id]);
    res.json({ message: 'Post updated.' });
  } catch (error) { next(error); }
}
async function deletePost(req, res, next) {
  if (req.post.author_id !== req.user.id) return res.status(403).json({ message: 'You can only delete your own posts.' });
  try {
    await pool.execute('DELETE FROM posts WHERE id = ? AND author_id = ?', [req.post.id, req.user.id]);
    if (req.post.image && /^\/uploads\/[a-f0-9-]+\.(jpg|png|webp|gif)$/.test(req.post.image)) {
      fs.unlink(require('node:path').join(__dirname, '..', req.post.image), () => {});
    }
    res.json({ message: 'Post deleted.' });
  } catch (error) { next(error); }
}
async function getPost(req, res, next) {
  try { res.json((await listPosts(req.user?.id || 0, { where: 'p.id = ?', params: [req.post.id] }))[0]); }
  catch (error) { next(error); }
}
async function getSavedPosts(req, res, next) {
  const page = pagination(req);
  if (!page) return res.status(400).json({ message: 'Invalid page.' });
  try { res.json(await listPosts(req.user.id, { ...page, where: 'EXISTS(SELECT 1 FROM saved_posts WHERE user_id = ? AND post_id = p.id)', params: [req.user.id] })); }
  catch (error) { next(error); }
}
async function savePost(req, res, next) {
  try {
    await pool.execute('INSERT OR IGNORE INTO saved_posts (user_id, post_id) VALUES (?, ?)', [req.user.id, req.post.id]);
    res.json({ message: 'Post saved.' });
  } catch (error) { next(error); }
}
async function unsavePost(req, res, next) {
  try {
    await pool.execute('DELETE FROM saved_posts WHERE user_id = ? AND post_id = ?', [req.user.id, req.post.id]);
    res.json({ message: 'Post removed from saved.' });
  } catch (error) { next(error); }
}
async function reportPost(req, res, next) {
  if (!text(req.body.reason, 300)) return res.status(400).json({ message: 'Add a reason of 1–300 characters.' });
  try {
    await pool.execute('INSERT OR IGNORE INTO reports (post_id, user_id, reason) VALUES (?, ?, ?)', [req.post.id, req.user.id, req.body.reason.trim()]);
    res.status(201).json({ message: 'Report recorded. Reports are stored locally; this prototype has no live moderation team.' });
  } catch (error) { next(error); }
}
module.exports = { createPost, editPost, deletePost, getPost, getSavedPosts, savePost, unsavePost, reportPost };
