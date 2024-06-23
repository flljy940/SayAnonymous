const pool = require('../db');

const likePost = async (postId, userId) => {
    await pool.execute('INSERT INTO likes (post_id, user_id) VALUES (?, ?)', [postId, userId]);
};

const unlikePost = async (postId, userId) => {
    await pool.execute('DELETE FROM likes WHERE post_id = ? AND user_id = ?', [postId, userId]);
};

module.exports = { likePost, unlikePost };
