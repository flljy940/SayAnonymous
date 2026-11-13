const { listPosts } = require('../lib/feed');
async function search(req, res, next) {
  const query = req.query.query;
  if (typeof query !== 'string' || !query.trim() || query.length > 100) return res.status(400).json({ message: 'Search for 1–100 characters.' });
  try {
    const posts = await listPosts(req.user?.id || 0, { where: 'p.content LIKE ?', params: [`%${query.trim()}%`] });
    res.json({ posts, users: [] });
  } catch (error) { next(error); }
}
module.exports = { search };
