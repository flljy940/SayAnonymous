import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './NewPost.css';

const NewPost = ({ post, onSave }) => {
  const [title, setTitle] = useState(post ? post.title : '');
  const [content, setContent] = useState(post ? post.content : '');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title && content) {
      try {
        const newPost = {
          title,
          content,
        };
        await onSave(newPost);
      } catch (err) {
        setError('Failed to save post');
        console.error('Error:', err);
      }
    } else {
      setError('Title and content are required');
    }
  };

  return (
    <div className="new-post">
      <h2>{post ? 'Edit Post' : 'Create New Post'}</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
        ></textarea>
        <button type="submit">{post ? 'Save Changes' : 'Create Post'}</button>
      </form>
    </div>
  );
};

export default NewPost;
