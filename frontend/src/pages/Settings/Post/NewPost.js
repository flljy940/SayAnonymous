import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './NewPost.css';
import SideBar from '../../../components/SideBar';

const NewPost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [community, setCommunity] = useState('');
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const navigate = useNavigate();

  const tags = ['votings', 'help', 'major', 'academics', 'hostels', 'courses'];
  const levels = ['level 1', 'level 2', 'level 3', 'level 4', 'level 5', 'level 6', 'all'];

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

  const handlePost = async () => {
    const postData = { title, content, community, selectedLevels, selectedTags };

    try {
      const response = await fetch('http://localhost:5000/api/post/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        navigate('/myposts');
      } else {
        console.error('Failed to create post');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDiscard = () => {
    setTitle('');
    setContent('');
    setCommunity('');
    setSelectedLevels([]);
    setSelectedTags([]);
  };

  return (
    <div className="container">
      <title>Create a Post - SayAnonymous</title>

      {/* Sidebar */}
      <div>
        <SideBar />
      </div>

      {/* Main content */}
      <div className="main-content">
        <h1>Create a post</h1>
        <div className="post-form">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Text (optional)"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          <div className="tags">
            {tags.map((tag) => (
              <button
                key={tag}
                className={`tag ${selectedTags.includes(tag) ? 'selected' : ''}`}
                onClick={() => handleTagClick(tag)}
              >
                + {tag}
              </button>
            ))}
          </div>
          <div className="choose-community">
            {levels.map((level) => (
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
          <div className="form-actions">
            <button onClick={handleDiscard} className="discard">
              Discard
            </button>
            <button onClick={handlePost} className="post">
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPost;
