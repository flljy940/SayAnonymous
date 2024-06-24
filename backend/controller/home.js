const pool = require('../db');

const getTrendingPosts = async (req, res) => {
    const query = `
        SELECT p.id, p.title, p.content, p.created_at, COUNT(v.id) AS views_count
        FROM posts p
        LEFT JOIN views v ON p.id = v.post_id
        GROUP BY p.id
        ORDER BY views_count DESC 
        LIMIT 10
    `;

    try {
        const [trendingPosts] = await pool.execute(query);
        res.status(200).json({ trendingPosts });
    } catch (error) {
        console.error('Error getting trending posts:', error);
        res.status(500).json({ message: 'Failed to get trending posts' });
    }
};

const getNewPosts = async (req, res) => {
    const query = `
        SELECT p.id, p.title, p.content, p.created_at
        FROM posts p
        ORDER BY p.created_at DESC
        LIMIT 10
    `;

    try {
        const [newPosts] = await pool.execute(query);
        res.status(200).json({ newPosts });
    } catch (error) {
        console.error('Error getting new posts:', error);
        res.status(500).json({ message: 'Failed to get new posts' });
    }
};

/*
const getHomePage = async (req, res) => {

    try {
        // Fetch user_specific data, for example, their posts, suggested posts, etc.
        // const userPostsQuery = 'SELECT * FROM posts WHERE author_id = ? ORDER BY created_at DESC LIMIT 10';
        // const [userPosts] = await pool.execute(userPostsQuery, [userID]);

        // Fetch trending posts or any other data needed for the home page
        // const trendingPostsQuery = `
            // SELECT p.id, p.title, p.content, p.created_at, COUNT(v.id) AS views_count
            // FROM posts p
            // LEFT JOIN views v ON p.id = v.post_id
            // GROUP BY p.id
            // ORDER BY views_count DESC LIMIT 10
        // `;
        // const [trendingPosts] = await pool.execute(trendingPostsQuery);

        // res.status(200).json({ userPosts, trendingPosts });

        const trendingPostsPromise = getTrendingPosts(req, res);
        const newPostsPromise = getNewPosts(req, res);

        const [trendingPosts, newPosts] = await Promise.all([trendingPostsPromise, newPostsPromise]);

        res.status(200).json({ trendingPosts, newPosts });
    } catch (error) {
        console.error('Error getting home page data:', error);
        res.status(500).json({ message: 'Failed to get home page data' });
    }
};
*/

module.exports = { getTrendingPosts, getNewPosts };
