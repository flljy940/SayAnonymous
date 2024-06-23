const pool = require('../db');

const addComment = async (postId, userId, comment) => {
    await pool.execute('INSERT INTO comments (post_id, user_id, comment) VALUES (?, ?, ?)', [postId, userId, comment]);
};

const getComments = async (postId) => {
    const [comments] = await pool.execute('SELECT * FROM comments WHERE post_id = ?', [postId]);
    return comments;
};

module.exports = { addComment, getComments };
