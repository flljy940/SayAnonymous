const pool = require('../db');

const searchPosts = async (query) => {

    const searchQuery = `
        SELECT p.*, u.id, u.username, u.avatar,
            (SELECT COUNT(*) FROM likes l WHERE l.post_id = p.id) AS likes,
            (SELECT COUNT(*) FROM comments c WHERE c.post_id = p.id) AS comments,
            EXISTS(SELECT 1 FROM likes l WHERE l.post_id = p.id AND l.user_id = u.id) AS isLikedByUser,
            EXISTS(SELECT 1 FROM saved_posts sp WHERE sp.post_id = p.id AND sp.user_id = u.id) AS isSavedByUser
        FROM posts p
        JOIN users u ON p.author_id = u.id
        WHERE p.content LIKE ?
        ORDER BY likes DESC
    `;

    return pool.query(searchQuery, `%${query}%`);
};

const searchUser = async (query) => {
    const searchQuery = `
        SELECT id, username, avatar
        FROM users
        WHERE username LIKE ?
        ORDER BY username ASC
    `;

    return pool.query(searchQuery, `%${query}%`);
};

const search = async (req, res) => {
    const query = req.query.query;

    if (!query) {
        return res.status(400).json({ message: 'Search query is required' });
    }

    try {
        // Search for posts, users, or groups matching the query
        const [posts] = await searchPosts(query);
        const [users] = await searchUser(query);

        res.status(200).json({ posts, users });
    } catch (error) {
        console.error('Error searching:', error);
        res.status(500).json({ message: 'Failed to search' });
    }
};


/*
const search = async (req, res) => {
    const query = req.query.query;

    if (!query) {
        return res.status(400).json({ error: 'Search query is required' });
    }

    try {
        // Example query to search in posts content and users username
        const searchQuery = `
            SELECT posts.*, users.username 
            FROM posts 
            JOIN users ON posts.author_id = users.id 
            WHERE posts.content LIKE ? OR users.username LIKE ?`;

        const [results] = await pool.execute(searchQuery, [`%${query}%`, `%${query}%`]);

        return res.json({
            query: query,
            results: results,
        });
    } catch (error) {
        console.error('Error executing search query:', error);
        return res.status(500).json({ error: 'An error occurred while searching' });
    }
};
*/

module.exports = { search };
