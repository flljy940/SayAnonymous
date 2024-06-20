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
    const query = `
    SELECT p.id, p.title, p.content, p.created_at, COUNT(l.id) AS views_count
    FROM posts p
    LEFT JOIN views v ON p.id = v.post_id
    GROUP BY p.id
    ORDER BY view_count DESC LIMIT 10
    `;

    try {
        const [trendingPosts] = await pool.execute(query);
        res.status(200).json({ trendingPosts });
    } catch (error) {
        console.error('Error getting trending posts:', error);
        res.status(500).json({ message: 'Failed to get trending posts' });
    }
};

module.exports = { getTrendingTopics, getTrendingPosts };
