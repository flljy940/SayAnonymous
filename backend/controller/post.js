const pool = require('../db');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const { recordActivity } = require('./exp');

const upload = multer({
  dest: 'uploads/', // Directory to save uploaded files
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size (e.g., 10 MB)
});

// Create a new post
const createPost = async (req, res) => {
  const { content } = req.body;
  const authorId = req.user.id;
  const image = req.file;

  const query = 'INSERT INTO posts (author_id, content, image) VALUES (?, ?, ?)';

  try {
    // Upload image file to GCS
    let imageUrl = null;
    if (image) {
      const fileName = `${Date.now()}-${image.originalname}`;
      const filePath = path.join(__dirname, '../uploads', fileName);

      // Move the file from multer's temporary storage to the final destination
      fs.renameSync(image.path, filePath);

      // Construct the URL for accessing the image
      imageUrl = `/uploads/${fileName}`;  
    }
    const [result] = await pool.query(query, [authorId, content, imageUrl]);
    const postId = result.insertId;

    await recordActivity(authorId, 'createPost');

    res.status(201).json({ message: 'Post created successfully', postId });
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'Failed to create post' });
  }
};

// Edit a post
const editPost = async (req, res) => {
  const { postId } = req.params;
  const userId = req.user.id;
  const { title, content } = req.body;
  const query = 'UPDATE posts SET title = ?, content = ? WHERE id = ? AND user_id = ?';

  try {
    await pool.execute(query, [ title, content, postId, userId ]);
    res.status(200).json({ message: 'Post updated successfully' });
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json({ error: 'Failed to update post' });
  }
};

  // Delete a post
const deletePost = async (req, res) => {
  const { postId } = req.params;
  const userId = req.user.id;
  const query = 'DELETE FROM posts WHERE id = ? AND user_id = ?';

  try {
    await pool.execute(query, [postId, userId]);
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ error: 'Failed to delete post' });
  }
};
  
  // Get a specific post
  const getPost = async (req, res) => {
    const { postId } = req.params;
    const postQuery = `SELECT p.*, u.username, u.avatar,
                        (SELECT COUNT(*) FROM likes WHERE post_id = p.id) AS likes,
                        (SELECT COUNT(*) FROM comments WHERE post_id = p.id) AS comments
                      FROM posts p 
                      JOIN users u ON p.author_id = u.id 
                      WHERE p.id = ?`;

    try {
      const [ results ] = await pool.execute(postQuery, [postId]);
      if (results.length > 0) {
        const post = results[0];
        const formattedPost = {
          id: post.id,
          title: post.title,
          content: post.content,
          image: post.image,
          user: { username: post.username, avatar: post.avatar },
          time: post.created_at,
          likes: post.likes,
          comments: post.comments,
        };

        res.json(formattedPost);
      } else {
        res.status(404).json({ error: 'Post not found' });
      }
    } catch (error) {
      console.error('Error getting post:', error);
      res.status(500).json({ error: 'Failed to get post' });
    }
  };
  
  // Get all posts
  const getPosts = async (req, res) => {
    const query = `SELECT p.*, u.username, u.avatar,
      (SELECT COUNT(*) FROM likes WHERE post_id = p.id) AS likes,
      (SELECT COUNT(*) FROM comments WHERE post_id = p.id) AS comments
    FROM posts p 
    JOIN users u ON p.author_id = u.id 
    WHERE p.id = ?`;

    try {
      const posts = await pool.execute(query);
      const formattedPost = {
        id: post.id,
        title: post.title,
        content: post.content,
        image: post.image,
        user: { username: post.username, avatar: post.avatar },
        created_at: post.created_at,
        likes: post.likes,
        comments: post.comments,
      };
      res.status(200).json(formattedPost);
    } catch (error) {
      console.error('Error getting posts:', error);
      res.status(500).json({ error: 'Failed to get posts' });
    }
  };

  // Save a post
  const savePost = async (req, res) => {
    const { postId } = req.params;
    const userId = req.user?.id;

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

  const unsavePost = async (req, res) => {
    const { postId } = req.params;
    const userId = req.user.id;

    try {
      await pool.execute('DELETE FROM saved_posts WHERE user_id = ? AND post_id = ?', [userId, postId]);
      res.status(200).json({ message: 'Post unsaved successfully' });
    } catch (error) {
      console.error('Error unsaving post:', error);
      res.status(500).json({ message: 'Failed to unsave post' });
    }
  };

  const getSavedPosts = async (req, res) => {
    const userId = req.user?.id;
    const query = `SELECT p.*, u.username, u.avatar,
                    (SELECT COUNT(*) FROM likes WHERE post_id = p.id) AS likes,
                    (SELECT COUNT(*) FROM comments WHERE post_id = p.id) AS comments
                  FROM saved_posts sp JOIN posts p ON sp.post_id = p.id JOIN users u ON p.author_id = u.id WHERE sp.user_id = ?`;

    try {
      const [posts] = await pool.execute(query, [userId]);
  
      const formattedPosts = posts.map(post => ({
        id: post.id,
        time: post.created_at,
        title: post.title,
        content: post.content,
        image: post.image,
        user: { username: post.username, avatar: post.avatar },
        likes: post.likes,
        comments: post.comments,
      }));

      res.json(formattedPosts);
    } catch (error) {
      console.error('Error getting saved posts:', error);
      res.status(500).json({ error: 'Failed to get saved posts' });
    }
  };

  module.exports = { createPost, editPost, deletePost, getPost, getPosts, savePost, unsavePost, getSavedPosts };
