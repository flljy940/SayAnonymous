const pool = require('../db');

const search = async (req, res) => {
    const query = req.query;

    if (!query) {
        return res.status(400).json({ message: 'Search query is required' });
    }

    try {
        // Search for posts, users, or groups matching the query
        const [posts] = await pool.execute('SELECT * FROM posts WHERE title LIKE ? OR content LIKE ?', [`%${query}%`, `%${query}%`]);
        const [users] = await pool.execute('SELECT * FROM users WHERE username LIKE ?', [`%${query}%`]);
        
        res.status(200).json({ posts, users });
    } catch (error) {
        console.error('Error searching:', error);
        res.status(500).json({ message: 'Failed to search' });
    }
};

module.exports = { search };
