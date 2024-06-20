const pool = require('../db');

// Create a new post
const createPost = async (req, res) => {
  const { title, content, category, isAnonymous } = req.body;
  const authorId = req.params; // Assuming you have a user object in the request
  const query = 'INSERT INTO posts (author_id, title, content, category, is_anonymous) VALUES (?, ?, ?, ?, ?)';
  
  try {
    await pool.query(query, [authorId, title, content, category, isAnonymous]);
    res.status(201).json({ message: 'Post created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create post' });
  }
};

// Edit a post
const editPost = async (req, res) => {
  const { postId } = req.params;
  const { title, content, category } = req.body;
  const query = 'UPDATE posts SET title = ?, content = ?, category = ? WHERE id = ?';

  try {
    await pool.execute(query, { title, content, category, postId });
    res.status(200).json({ message: 'Post updated successfully' });
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json({ error: 'Failed to update post' });
  }
};

  // Delete a post
const deletePost = async (req, res) => {
  const { postId } = req.params;
  const query = 'DELETE FROM posts WHERE id = ?';

  try {
    await pool.execute(query, [postId]);
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ error: 'Failed to delete post' });
  }
};
  
  // Get a specific post
  const getPost = async (req, res) => {
    const { postId } = req.params;
    const query = 'SELECT * FROM posts WHERE id = ?';

    try {
      const [ results ] = await pool.execute(query, [postId]);
      if (results.length > 0) {
        res.status(200).json(results[0]);
      } else {
        res.status(404).json({ error: 'Post not found' });
      }
    } catch (error) {
      console.error('Error fetching post:', error);
      res.status(500).json({ error: 'Failed to fetch post' });
    }
  };
  
  // Get all posts
  const getPosts = async (req, res) => {
    const query = 'SELECT * FROM posts';

    try {
      const posts = await pool.execute(query);
      res.status(200).json(posts);
    } catch (error) {
      console.error('Error fetching posts:', error);
      res.status(500).json({ error: 'Failed to fetch posts' });
    }
  };

  // Save a post
  const savePost = async (req, res) => {
    const { userId, postId } = req.body;

    try {
      // Check if the post is already saved by the user
      const [ existingRows ] = await pool.execute('SELECT * FROM saved_posts WHERE user_id = ? AND post_id = ?', [userId, postId]);
      if (existingRows.length > 0) {
        return res.status(400).json({ message: 'Post already saved' });
      }  

      // Save the post for the user
      await pool.execute('INSERT INTO saved_posts (user_id, post_id) VALUES (?, ?)', [userId, postId]);
      res.status(201).json({ message: 'Post saved successfully' });
    } catch (error) {
      console.error('Error saving post:', error);
      res.status(500).json({ message: 'Failed to save post' });
    }
  };

  module.exports = { createPost, editPost, deletePost, getPost, getPosts, savePost };
