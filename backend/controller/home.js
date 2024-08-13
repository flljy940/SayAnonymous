const pool = require('../db');

const getTrendingPosts = async (req, res) => {
    const userId = req.user.id;

    const query = `
        SELECT p.*, u.username, u.avatar,
            (SELECT COUNT(*) FROM likes l WHERE l.post_id = p.id) AS likes,
            (SELECT COUNT(*) FROM comments c WHERE c.post_id = p.id) AS comments,
            EXISTS(SELECT 1 FROM likes l WHERE l.post_id = p.id AND l.user_id = ?) AS isLikedByUser,
            EXISTS(SELECT 1 FROM saved_posts sp WHERE sp.post_id = p.id AND sp.user_id = ?) AS isSavedByUser
        FROM posts p
        JOIN users u ON p.author_id = u.id
        ORDER BY likes DESC
    `;

    try {
        const [trendingPosts] = await pool.execute(query, [userId, userId]);
        if (trendingPosts.length > 0) {
            const formattedPost = trendingPosts.map(post => ({
              id: post.id,
              content: post.content,
              image: post.image,
              user: { username: post.username, avatar: post.avatar },
              time: post.created_at,
              likes: post.likes,
              comments: post.comments,
              isLikedByUser: !!post.isLikedByUser,
              isSavedByUser: !!post.isSavedByUser,
            }));
    
            res.status(200).json(formattedPost);
        }
    } catch (error) {
        console.error('Error getting trending posts:', error);
        res.status(500).json({ message: 'Failed to get trending posts' });
    }
};

const getNewPosts = async (req, res) => {
    const userId = req.user.id;

    const query = `
        SELECT p.*, u.username, u.avatar,
            (SELECT COUNT(*) FROM likes l WHERE l.post_id = p.id) AS likes,
            (SELECT COUNT(*) FROM comments c WHERE c.post_id = p.id) AS comments,
            EXISTS(SELECT 1 FROM likes l WHERE l.post_id = p.id AND l.user_id = ?) AS isLikedByUser,
            EXISTS(SELECT 1 FROM saved_posts sp WHERE sp.post_id = p.id AND sp.user_id = ?) AS isSavedByUser
        FROM posts p
        JOIN users u ON p.author_id = u.id
        ORDER BY p.created_at DESC 
    `;

    try {
        const [newPosts] = await pool.execute(query, [userId, userId]);
        if (newPosts.length > 0) {
            const formattedPost = newPosts.map(post => ({
              id: post.id,
              content: post.content,
              image: post.image,
              user: { username: post.username, avatar: post.avatar },
              time: post.created_at,
              likes: post.likes,
              comments: post.comments,
              isLikedByUser: !!post.isLikedByUser,
              isSavedByUser: !!post.isSavedByUser,
            }));
    
            res.status(200).json(formattedPost);
        }
    } catch (error) {
        console.error('Error getting new posts:', error);
        res.status(500).json({ message: 'Failed to get new posts' });
    }
};

module.exports = { getTrendingPosts, getNewPosts };
