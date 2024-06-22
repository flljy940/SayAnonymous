const pool = require('../db');
const { recordActivity } = require('./exp');

const likePost = async (req, res) => {
    const { userId, postId } = req.params;

    try {
        // Check if the post is allready liked by the user
        const [existingLike] = await pool.execute(
            'SELECT * FROM likes WHERE user_id = ? AND post_id = ?', [userId, postId]
        );

        if (existingLike.length > 0) {
            return res.status(400).json({ message: 'Post already liked' });
        }

        // Insert a new like into the likes table
        await pool.execute(
            'INSERT INTO likes (user_id, post_id) VALUES (?, ?)', [userId, postId]
        );
        await pool.execute('UPDATE user_engagement SET received_likes = received_likes + 1 WHERE user_id = (SELECT author_id FROM posts WHERE id = ?)', [postId]);

        res.status(201).json({ message: 'Post liked successfully' });
    } catch (error) {
        console.error('Error liking post:', error);
        res.status(500).json({ message: 'Failed to like post' });
    }
};

module.exports = { likePost };