const pool = require('../db');
const { topics, production } = require('../lib/config');
async function getGeneralStats(req, res, next) {
  try {
    const [rows] = await pool.execute(`SELECT
      (SELECT COUNT(*) FROM users) AS user_count, (SELECT COUNT(*) FROM posts) AS post_count,
      (SELECT COUNT(*) FROM comments) AS comment_count, (SELECT COUNT(*) FROM likes) AS likes_count`);
    const [counts] = await pool.execute('SELECT topic, COUNT(*) AS count FROM posts GROUP BY topic');
    res.json({ ...rows[0], demoEnabled: !production, topics: topics.map(name => ({ name, count: counts.find(t => t.topic === name)?.count || 0 })) });
  } catch (error) { next(error); }
}
async function getUserStats(req, res, next) {
  try {
    const [rows] = await pool.execute(`SELECT
      (SELECT COUNT(*) FROM posts WHERE author_id = ?) AS posts,
      (SELECT COUNT(*) FROM comments WHERE user_id = ?) AS comments,
      (SELECT COUNT(*) FROM likes WHERE user_id = ?) AS likes`, [req.user.id, req.user.id, req.user.id]);
    res.json(rows[0]);
  } catch (error) { next(error); }
}
module.exports = { getGeneralStats, getUserStats };
