const pool = require('../db');
const { id } = require('./validation');
const { topics } = require('./config');
const formatPost = (p, viewer) => ({
  id: p.id, content: p.content, image: p.image, topic: p.topic, time: p.created_at,
  user: { username: p.pseudonym || p.username, avatar: p.avatar },
  likes: p.likes, comments: p.comments, isLikedByUser: !!p.isLikedByUser,
  isSavedByUser: !!p.isSavedByUser, isOwner: p.author_id === viewer,
});
async function listPosts(viewer = 0, { where = '1=1', params = [], sort = 'new', limit = 20, offset = 0 } = {}) {
  const [rows] = await pool.execute(`SELECT p.*, u.username, u.pseudonym, u.avatar,
    (SELECT COUNT(*) FROM likes WHERE post_id = p.id) AS likes,
    (SELECT COUNT(*) FROM comments WHERE post_id = p.id) AS comments,
    EXISTS(SELECT 1 FROM likes WHERE post_id = p.id AND user_id = ?) AS isLikedByUser,
    EXISTS(SELECT 1 FROM saved_posts WHERE post_id = p.id AND user_id = ?) AS isSavedByUser
    FROM posts p JOIN users u ON p.author_id = u.id
    WHERE ${where} ORDER BY ${sort === 'top' ? 'likes DESC,' : ''} p.created_at DESC, p.id DESC LIMIT ? OFFSET ?`,
    [viewer, viewer, ...params, limit, offset]);
  return rows.map(row => formatPost(row, viewer));
}
function pagination(req) {
  const limit = Number(req.query.limit ?? 20), offset = Number(req.query.offset ?? 0);
  if (!Number.isInteger(limit) || limit < 1 || limit > 50 || !Number.isInteger(offset) || offset < 0 || offset > 100000) return null;
  return { limit, offset };
}
async function feed(req, res, next) {
  const page = pagination(req);
  if (!page) return res.status(400).json({ message: 'Invalid page.' });
  const where = [], params = [];
  if (req.query.topic) {
    if (!topics.includes(req.query.topic)) return res.status(400).json({ message: 'Choose a valid topic.' });
    where.push('p.topic = ?'); params.push(req.query.topic);
  }
  if (req.query.q) {
    if (typeof req.query.q !== 'string' || req.query.q.length > 100) return res.status(400).json({ message: 'Search must be 100 characters or fewer.' });
    where.push("p.content LIKE ? ESCAPE '\\'"); params.push('%' + req.query.q.replace(/[\\%_]/g, '\\$&') + '%');
  }
  try { res.json(await listPosts(req.user?.id || 0, { ...page, where: where.join(' AND ') || '1=1', params, sort: req.params.sort || req.query.sort })); }
  catch (error) { next(error); }
}
function requirePost(req, res, next) {
  if (!id(req.params.postId)) return res.status(400).json({ message: 'Invalid post.' });
  const post = pool.database.prepare('SELECT * FROM posts WHERE id = ?').get(Number(req.params.postId));
  if (!post) return res.status(404).json({ message: 'Post not found.' });
  req.post = post;
  next();
}
module.exports = { listPosts, feed, pagination, requirePost };
