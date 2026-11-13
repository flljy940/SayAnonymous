const { database } = require('../db');
const { feed } = require('../lib/feed');
function getTrendingTopics(req, res) {
  res.json({ trendingTopics: database.prepare('SELECT topic, COUNT(*) AS mentions_count FROM posts GROUP BY topic ORDER BY mentions_count DESC').all() });
}
module.exports = { getTrendingTopics, getTrendingPosts: (req, res, next) => { req.query.sort = 'top'; return feed(req, res, next); } };
