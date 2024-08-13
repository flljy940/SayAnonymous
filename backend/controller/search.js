const pool = require('../db');

/*
const searchPosts = async (query) => {
    const searchQuery = `
        SELECT id, content, created_at
        FROM posts
        WHERE title LIKE ? OR content LIKE ?
        ORDER BY created_at DESC
    `;

    return pool.query(searchQuery, [`%${query}%`, `%${query}%`]);
};

const searchUser = async (query) => {
    const searchQuery = `
        SELECT id, username, avatar
        FROM users
        WHERE username LIKE ? OR description LIKE ?
        ORDER BY username ASC
    `;

    return pool.query(searchQuery, [`%${query}%`, `%${query}%`]);
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

        res.status(200).json({ posts, users, topics });
    } catch (error) {
        console.error('Error searching:', error);
        res.status(500).json({ message: 'Failed to search' });
    }
};
*/

exports.performSearch = async (req, res) => {
    const query = req.query.query;

    if (!query) {
        return res.status(400).json({ error: 'Search query is required' });
    }

    try {
        // Example query to search in posts content and users username
        const searchQuery = `
            SELECT posts.*, users.username 
            FROM posts 
            JOIN users ON posts.user_id = users.id 
            WHERE posts.content LIKE ? OR users.username LIKE ?`;

        const [results] = await db.execute(searchQuery, [`%${query}%`, `%${query}%`]);

        return res.json({
            query: query,
            results: results,
        });
    } catch (error) {
        console.error('Error executing search query:', error);
        return res.status(500).json({ error: 'An error occurred while searching' });
    }
};

// module.exports = { search };
