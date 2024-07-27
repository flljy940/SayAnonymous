const pool = require('../db');
const { recordActivity } = require('./exp');
const { createNotification } = require('./notifications');

// Add a comment
const addComment = async (req, res) => {
    const userId = req.user.id;
    const { postId } = req.params;
    const { comment } = req.body;
    const query = 'INSERT INTO comments (post_id, user_id, comment) VALUES (?, ?, ?)';

    try {
        const [result] = await pool.execute(query, [postId, userId, comment]);
        
        const [newComment] = await pool.execute('SELECT * FROM comments WHERE id = ?', [result.insertId]);

        await recordActivity(userId, 'comment');

        const [post] = await pool.query('SELECT author_id FROM posts WHERE id = ?', [postId]);
        const recipientId = post[0].author_id;

        if (recipientId !== userId) {
            await createNotification(recipientId, 'Someone commented on your post', 'comment');
        }

        res.status(201).json(newComment[0]);
    } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).json({ error: 'Failed to add comment' });
    }
};

// Edit a comment
const editComment = async (req, res) => {
    const { commentId } = req.params;
    const { comment } = req.body;
    const query = 'UPDATE comments SET comment = ? WHERE id = ?';

    try {
        await pool.execute(query, [comment, commentId]);
        res.status(200).json({ message: 'Comment updated successfully' });
    } catch (error) {
        console.error('Error updating comment:', error);
        res.status(500).json({ error: 'Failed to update comment' });
    }
};

// Delete a comment
const deleteComment = async (req, res) => {
    const { commentId } = req.params;
    const query = 'DELETE FROM comments WHERE id = ?';

    try {
        await pool.execute(query, [commentId]);
        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        console.error('Error deleting comment:', error);
        res.status(500).json({ error: 'Failed to delete comment' });
    }
};

// Get comments for a specific post
const getComments = async (req, res) => {
    const { postId } = req.params;
    const query = 'SELECT * FROM comments WHERE post_id = ?';

    try {
        const [comments] = await pool.execute(query, [postId]);
        res.status(200).json(comments);
    } catch (error) {
        console.error('Error getting comments:', error);
        res.status(500).json({ error: 'Failed to get comments' });
    }
};

module.exports = { addComment, editComment, deleteComment, getComments };