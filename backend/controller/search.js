const pool = require('../db');

const searchPosts = async (query) => {
    const searchQuery = `
        SELECT id, title, content, created_at
        FROM posts
        WEHRE title LIKE ? OR content LIKE ?
        ORDER BY created_at DESC
    `;

    return pool.query(searchQuery, [`%${query}%`, `%${query}%`]);
};

const searchUser = async (query) => {
    const searchQuery = `
        SELECT id, pseudonym, avatar, description
        FROM users
        WHERE pseudony LIKE ? OR description LIKE ?
        ORDER BY username ASC
    `;

    return pool.query(searchQuery, [`%${query}%`, `%${query}%`]);
};

const searchTopics = async (query) => {
    const searchQuery = `
        SELECT id, name
        FROM topics
        WHERE name LIKE ?
        ORDER BY name ASC
    `;

    return pool.query(searchQuery, [`%${query}%`]);
};

const search = async (req, res) => {
    const query = req.query.q;

    if (!query) {
        return res.status(400).json({ message: 'Search query is required' });
    }

    try {
        // Search for posts, users, or groups matching the query
        const [posts] = await searchPosts(q);
        const [users] = await searchUser(q);
        const [topics] = await searchTopics(q);

        res.status(200).json({ posts, users, topics });
    } catch (error) {
        console.error('Error searching:', error);
        res.status(500).json({ message: 'Failed to search' });
    }
};

module.exports = { search };
