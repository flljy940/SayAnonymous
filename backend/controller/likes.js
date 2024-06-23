const pool = require('../db');
const { recordActivity } = require('./exp');

const likePost = async (req, res) => {
    const { postId } = req.params;
    const userId = req.user.id;

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

const unlikePost = async (req, res) => {
    const { userId, postId } = req.params;
     
    try {
        await pool.execute('DELETE FROM likes WHERE user_id = ? AND post_id = ?', [userId, postId]);
        res.status(200).json({ message: 'Post unliked successfully' });
    } catch (error) {
        console.error('Error unliking post:', error);
        res.status(500).json({ error: 'Failed to unlike post' });
    }
};

const getPostLikes = async (req, res) => {
    const { postId } = req.params;
    
    try {
        const [likes] = await pool.query('SELECT user_id FROM likes WHERE post_id = ?', [postId]);
        res.status(200).json(likes);
    } catch (error) {
        console.error('Error getting likes:', error);
        res.status(500).json({ error: 'Failed to get likes' });
    }
};

module.exports = { likePost, unlikePost, getPostLikes };