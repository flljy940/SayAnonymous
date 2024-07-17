import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './NewPost.css';

const NewPost = ({ post }) => {
  const [content, setContent] = useState(post ? post.content : '');
  const [image, setImage] = useState(post ? post.image : '');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleImageUpload = (e) => {
    setImage(e.target.files[0]);
  };

  const handleDiscard = () => {
    setContent('');
    setImage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      alert('You must be logged in to create a post');
      return;
    }

    const formData = new FormData();
    formData.append('content', content);
    if (image) {
      formData.append('image', image);
    }

    if (content) {
      try {
        const response = await fetch(`http://localhost:5000/api/post/create`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          handleDiscard();
          navigate('/pages/settings/myposts');
        } else {
          const errorText = await response.text();
          setError(`Error: ${errorText}`);
        }
      } catch (err) {
        setError('Failed to save post');
        console.error('Error:', err);
      }
    } else {
      setError('Content are required');
    }
  };

  return (
    <div className='new-post'>
      <h2>{post ? 'Edit Post' : 'Create a Post'}</h2>
      {error && <p className='error'>{error}</p>}
      <form className="post-creator-form" onSubmit={handleSubmit}>
        <div className='main-content'>
        <div className='inputs'>
          <textarea
            className='text-input'
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder='Content'
          ></textarea>
        </div>
        <div className="media-upload">
        <div className="form-group">
          <label htmlFor="image">Upload Image</label>
          <input type="file" id="image" accept="image/*" onChange={handleImageUpload} />
        </div>
      </div>
      <div className="form-actions">
        <button type='button' onClick={handleDiscard} className='discard'>Discard</button>
        <button type="submit" className='post'>{post ? 'Save Changes' : 'Post'}</button>
      </div>
      </div>
      </form>
    </div>
  )
};

export default NewPost;
