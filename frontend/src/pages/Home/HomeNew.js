// HomeNew.js
import React from 'react';
import Post from '../../components/Post';
import './Home.css';
import { Link } from 'react-router-dom';

const HomeNew = () => {

  const posts = [
    {
      user: { name: 'NEW: love2030', avatar: 'avatar1.png' },
      time: '3 min ago',
      content: "This is HomeNew page",
      image: 'post-image1.jpg',
      likes: 21,
      comments: 4,
    },
    {
      user: { name: "What'sUp", avatar: 'avatar2.png' },
      time: '2 hrs ago',
      content: 'Thinking of traveling to Indonesia...',
      likes: 5,
      comments: 1,
    },
    {
      user: { name: 'love2030', avatar: 'avatar1.png' },
      time: '3 min ago',
      content: "Hope everything's okay after PA :)",
      image: 'post-image1.jpg',
      likes: 21,
      comments: 4,
    },
    {
      user: { name: "What'sUp", avatar: 'avatar2.png' },
      time: '2 hrs ago',
      content: 'Thinking of traveling to Indonesia...',
      likes: 5,
      comments: 1,
    },
    {
      user: { name: 'love2030', avatar: 'avatar1.png' },
      time: '3 min ago',
      content: "Hope everything's okay after PA :)",
      image: 'post-image1.jpg',
      likes: 21,
      comments: 4,
    },
    {
      user: { name: "What'sUp", avatar: 'avatar2.png' },
      time: '2 hrs ago',
      content: 'Thinking of traveling to Indonesia...',
      likes: 5,
      comments: 1,
    },
  ];

  return (
    <div className="container">
      <title>SayAnonymous</title>

        {/* 中间部分 */}
        <div className="main-content">
            <div className="tabs">
            <span>NUS</span>
              <span>
                <Link to="/pages/home/*" className="toClick">
                  Top
                </Link>
              </span>
              
              <span  className="active-tab">
                <Link to="/pages/home/new" className="clicked">
                  New
                </Link>
              </span>

              <span className="tab">
                <Link to="/pages/home/major" className="toClick">
                  Majors
                </Link>
              </span>
            </div>

            {/* 帖子 */}
            <div className="posts">
              {posts.map((post, index) => (
                <Post key={index} {...post} />
              ))}
            </div>
        </div>  
    </div>
  );
}

export default HomeNew;
