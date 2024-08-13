const pool = require('../db');

const getTrendingTopics = async (req, res) => {
    const query =  `
    SELECT topic, COUNT(*) AS mentions_count
    FROM mentions
    GROUP BY topic
    ORDER BY mentions_count DESC
    LIMIT 10
    `;

    try {
        const [trendingTopics] = await pool.execute(query);
        res.status(200).json({ trendingTopics });
    } catch (error) {
        console.error('Error getting trending topics:', error);
        res.status(500).json({ message: 'Failed to get trending topics' });
    }
}

const getTrendingPosts = async (req, res) => {
    const userId = req.user.id;
    const query = `
        SELECT p.id, p.content, p.created_at, COUNT(v.id) AS views_count,
            EXISTS(SELECT 1 FROM likes WHERE post_id = p.id AND user_id = ?) AS isLikedByUser,
            EXISTS(SELECT 1 FROM saved_posts WHERE post_id = p.id AND user_id = ?) AS isSavedByUser
        FROM posts p
        LEFT JOIN views v ON p.id = v.post_id
        GROUP BY p.id
        ORDER BY views_count DESC 
        LIMIT 10
    `;

    try {
        const [trendingPosts] = await pool.execute(query, [userId, userId]);
        const formattedPost = trendingPosts.map(post => ({
            id: post.id,
            content: post.content,
            time: post.created_at,
            viewsCount: post.views_count,
            isLikedByUser: !!post.isLikedByUser,
            isSavedByUser: !!post.isSavedByUser,
        }))
        res.status(200).json(formattedPost);
    } catch (error) {
        console.error('Error getting trending posts:', error);
        res.status(500).json({ message: 'Failed to get trending posts' });
    }
};

module.exports = { getTrendingTopics, getTrendingPosts };
