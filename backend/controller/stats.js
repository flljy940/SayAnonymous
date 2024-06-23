const pool = require('../db');

const getUserActivityStats = async (req, res) => {
  const userId = req.params;

  try {
    const query = `
      SELECT 
        (SELECT COUNT(*) FROM posts WHERE author_id = ?) AS post_count,
        (SELECT COUNT(*) FROM comments WHERE user_id = ?) AS comment_count,
        (SELECT COUNT(*) FROM likes WHERE user_id = ?) AS like_count,
        (SELECT COUNT(*) FROM comments WHERE post_id IN (SELECT id FROM posts WHERE author_id = ?)) AS received_comments_count,
        (SELECT COUNT(*) FROM likes WHERE post_id IN (SELECT id FROM posts WHERE author_id = ?)) AS received_likes_count
      FROM dual
    `;

    const [stats] = await pool.execute(query, [userId, userId, userId, userId, userId]);
    res.json(stats[0]);
  } catch (error) {
    console.error('Error getting user activity stats:', error);
    res.status(500).json({ message: 'Failed to get stats' });
  }
};

const getPostEngagementStats = async (req, res) => {
  const { postId } = req.params;

  try {
    const query = `
      SELECT 
        (SELECT COUNT(*) FROM views WHERE post_id = ?) AS views_count,
        (SELECT COUNT(*) FROM comments WHERE post_id = ?) AS comments_count,
        (SELECT COUNT(*) FROM likes WHERE post_id = ?) AS likes_count
      FROM dual
    `;

    const [stats] = await pool.query(query, [postId, postId, postId]);
    res.status(200).json(stats[0]);
  } catch (error) {
    console.error('Error getting post engagement stats:', error);
    res.status(500).json({ message: 'Failed to get post engagement stats' });
  }
};

const getGeneralStats = async (req, res) => {
  try {
    const query = `
      SELECT 
        (SELECT COUNT(*) FROM users) AS user_count,
        (SELECT COUNT(*) FROM posts) AS post_count,
        (SELECT COUNT(*) FROM comments) AS comment_count,
        (SELECT COUNT(*) FROM likes) AS likes_count
      FROM dual
    `;

    const [stats] = await pool.query(stats);
    res.status(200).json(stats[0]);
  } catch (error) {
    console.error('Error getting general stats:', error);
    res.status(500).json({ message: 'Failed to get general stats' });
  }
};

const getUserStats = async (req, res) => {
  const { userId } = req.params;

  try {
    const [likesCount] = await pool.execute('SELECT COUNT(*) as count FROM likes WHERE user_id = ?', [userId]);
    const [commentsCount] = await pool.execute('SELECT COUNT(*) as count FROM comments WHERE user_id = ?', [userId]);
    const [postsCount] = await pool.execute('SELECT COUNT (*) as count FROM posts WHERE user_id = ?', [userId]);

    res.status(200).json({
      likes: likesCount[0].count,
      comments: commentsCount[0].count,
      posts: postsCount[0].count
    });
  } catch (error) {
    console.error('Error getting user stats:', error);
    res.status(500).json({ message: 'Failed to get user stats' });
  }
};

const getPostStats = async (req, res) => {
  const { postId } = req.params;

  try {
    const [likesCount] = await pool.execute('SELECT COUNT(*) as count FROM likes WHERE post_id = ?', [postId]);
    const [commentsCount] = await pool.execute('SELECT COUNT(*) as count FROM comments WHERE post_id = ?', [postId]);

    res.status(200).json({
      likes: likesCount[0].count,
      comments: commentsCount[0].count
    });
  } catch (error) {
    console.error('Error getting post stats:', error);
    res.status(500).json({ message: 'Failed to get post stats' });
  }
};

module.exports = { getUserActivityStats, getPostEngagementStats, getGeneralStats, getUserStats, getPostStats };
