const pool = require('../db');
const { createNotification } = require('./notifications');

const likePost = async (req, res) => {
    const { postId } = req.params;
    const userId = req.user.id;

    try {
        // Insert a new like into the likes table
        await pool.execute(
            'INSERT INTO likes (user_id, post_id) VALUES (?, ?)', [userId, postId]
        );

        // Fetch the post owner to send the notification 
        const [post] = await pool.query('SELECT author_id FROM posts WHERE id = ?', [postId]);
        const recipientId = post[0].author_id;
        if (recipientId !== userId) {
            await createNotification(recipientId, 'Someone liked your post', 'like');
        }

        const [likesCount] = await pool.execute(
            'SELECT COUNT(*) AS count FROM likes WHERE post_id = ?', [postId]
        );

        res.status(201).json({ likes: likesCount[0].count });
    } catch (error) {
        console.error('Error liking post:', error);
        res.status(500).json({ message: 'Failed to like post' });
    }
};

const unlikePost = async (req, res) => {
    const { postId } = req.params;
    const userId = req.user.id;
     
    try {
        await pool.execute('DELETE FROM likes WHERE user_id = ? AND post_id = ?', [userId, postId]);
        
        const [likesCount] = await pool.execute(
            'SELECT COUNT(*) AS count FROM likes WHERE post_id = ?', [postId]
        );

        res.status(200).json({ likes: likesCount[0].count });
    } catch (error) {
        console.error('Error unliking post:', error);
        res.status(500).json({ error: 'Failed to unlike post' });
    }
};

const getPostLikes = async (req, res) => {
    const { postId } = req.params;
    
    try {
        const [likesCount] = await pool.query('SELECT COUNT(*) AS count FROM likes WHERE post_id = ?', [postId]);
        res.status(200).json({ likes: likesCount[0].count });
    } catch (error) {
        console.error('Error getting likes:', error);
        res.status(500).json({ error: 'Failed to get likes' });
    }
};

module.exports = { likePost, unlikePost, getPostLikes };