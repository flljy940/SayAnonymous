import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './NewPost.css';

const NewPost = ({ post }) => {
  const [title, setTitle] = useState(post ? post.title : '');
  const [content, setContent] = useState(post ? post.content : '');
  const [image, setImage] = useState(post ? post.image : '');
  const [selectedTags, setSelectedTags] = useState(post ? post.tags : []);
  const [selectedLevels, setSelectedLevels] = useState(post ? post.levels : []);
  const [error, setError] = useState(null);

  const tags = ['Votings', 'Course', 'Help', 'Discussion']; 
  const levels1 = ['Level1', 'Level2', 'Level3'];
  const levels2 = ['Level4', 'Level5', 'Level6']; 

  const navigate = useNavigate();

  const handleTagClick = (tag) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag]
    );
  };

  const handleLevelChange = (level) => {
    setSelectedLevels((prevLevels) =>
      prevLevels.includes(level)
        ? prevLevels.filter((l) => l !== level)
        : [...prevLevels, level]
    );
  };

  const handleDiscard = () => {
    setTitle('');
    setContent('');
    setImage('');
    setSelectedTags([]);
    setSelectedLevels([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      alert('You must be logged in to create a post');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (image) {
      formData.append('image', image);
    }
    formData.append('tags', JSON.stringify(selectedTags));
    formData.append('levels', JSON.stringify(selectedLevels));

    if (title && content) {
      try {
        const response = await fetch(`api/post/create`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          setTitle('');
          setContent('');
          setImage(null);
          setSelectedTags('');
          setError(null);
          // navigate('/pages/settings/myposts');
        } else {
          const errorText = await response.text();
          setError(`Error: ${errorText}`);
        }
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
        <div className='inputs'>
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
          <input
            type="file"
            // value={image}
            accept='image/*'
            onChange={(e) => setImage(e.target.value[0])}
            placeholder="Image"
          />
        </div>
        <div className="tags">
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              className={`tag ${selectedTags.includes(tag) ? 'selected' : ''}`}
              onClick={() => handleTagClick(tag)}
            >
              + {tag}
            </button>
          ))}
        </div>

        <div className='viewable'>
        <div className="choose-community">
          {levels1.map((level) => (
            <label key={level} className="level-option">
              <input
                type="checkbox"
                value={level}
                checked={selectedLevels.includes(level)}
                onChange={() => handleLevelChange(level)}
              />
              {level}
            </label>
          ))}
        </div>
        <div className="choose-community">
          {levels2.map((level) => (
            <label key={level} className="level-option">
              <input
                type="checkbox"
                value={level}
                checked={selectedLevels.includes(level)}
                onChange={() => handleLevelChange(level)}
              />
              {level}
            </label>
          ))}
        </div>
        </div>

        <div className="form-actions">
          <button type="button" onClick={handleDiscard} className="discard">
            Discard
          </button>
          <button type="submit" className="post">
            {post ? 'Save Changes' : 'Post'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewPost;
