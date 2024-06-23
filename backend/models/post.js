const pool = require('../db');

const createPost = async (title, content, userId) => {
    const result = await pool.execute('INSERT INTO posts (title, content, user_id) VALUES (?, ?, ?)', [title, content, userId]);
    return result[0].insertId;
};

const getPost = async (postId) => {
    const [posts] = await pool.execute('SELECT * FROM posts WHERE id = ?', [postId]);
    return posts[0];
};

const getPosts = async () => {
    const [posts] = await pool.execute('SELECT * FROM posts');
    return posts;
};

const updatePost = async (postId, title, content, userId) => {
    await pool.execute('UPDATE posts SET title = ?, content = ? WHERE id = ? AND user_id = ?', [title, content, postId, userId]);
};

const deletePost = async (postId, userId) => {
    await pool.execute('DELETE FROM posts WHERE id = ? AND user_id = ?', [postId, userId]);
};

const savePost = async (postId, userId) => {
    await pool.execute('INSERT INTO saved_posts (post_id, user_id) VALUES (?, ?)', [postId, userId]);
};

module.exports = { createPost, getPost, getPosts, updatePost, deletePost, savePost };
