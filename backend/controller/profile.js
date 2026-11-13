const pool = require('../db');
const { listPosts, pagination } = require('../lib/feed');
const { text, id } = require('../lib/validation');
function format(user) {
  return { id: user.id, username: user.pseudonym || user.username, pseudonym: user.pseudonym, avatar: user.avatar,
    description: user.description, exp: user.exp, level: user.level, progress: user.exp % 50, isDemo: !!user.is_demo };
}
async function getProfile(req, res, next) {
  try {
    const [rows] = await pool.execute('SELECT * FROM users WHERE id = ?', [req.user.id]);
    res.json(format(rows[0]));
  } catch (error) { next(error); }
}
async function getUserProfile(req, res, next) {
  if (!id(req.params.userId)) return res.status(400).json({ message: 'Invalid profile.' });
  try {
    const [rows] = await pool.execute('SELECT * FROM users WHERE id = ?', [Number(req.params.userId)]);
    if (!rows[0]) return res.status(404).json({ message: 'Profile not found.' });
    const { id: userId, username, avatar, description } = format(rows[0]);
    res.json({ id: userId, username, avatar, description });
  } catch (error) { next(error); }
}
async function setupProfile(req, res, next) {
  const { pseudonym, description = '', avatar } = req.body;
  if (!text(pseudonym, 24) || typeof description !== 'string' || description.length > 200 || !Number.isInteger(avatar) || avatar < 1 || avatar > 6) return res.status(400).json({ message: 'Choose a nickname of 1–24 characters, an avatar, and a bio up to 200 characters.' });
  try {
    await pool.execute('UPDATE users SET pseudonym = ?, avatar = ?, description = ? WHERE id = ?', [pseudonym.trim(), avatar, description.trim(), req.user.id]);
    return getProfile(req, res, next);
  } catch (error) { next(error); }
}
async function getMyPosts(req, res, next) {
  const page = pagination(req);
  if (!page) return res.status(400).json({ message: 'Invalid page.' });
  try { res.json(await listPosts(req.user.id, { ...page, where: 'p.author_id = ?', params: [req.user.id] })); }
  catch (error) { next(error); }
}
async function getUserPosts(req, res, next) {
  if (!id(req.params.userId)) return res.status(400).json({ message: 'Invalid profile.' });
  const page = pagination(req);
  if (!page) return res.status(400).json({ message: 'Invalid page.' });
  try { res.json(await listPosts(req.user?.id || 0, { ...page, where: 'p.author_id = ?', params: [Number(req.params.userId)] })); }
  catch (error) { next(error); }
}
module.exports = { setupProfile, getProfile, getUserProfile, getMyPosts, getUserPosts };
