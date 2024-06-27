// Home.js
import React from 'react';
import SideItem from '../../components/SideItem';
import Person from '../../components/Person';
import Post from '../../components/Post';
import Topic from '../../components/Topic';
import './Home.css';
import { Link } from 'react-router-dom';

const HomeMajor = () => {

  const posts = [
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
        <div className="headline">
          <div className="headline1">
            <h1 className="name">HomeNew</h1>
          </div>
        </div>

        {/* main content */}
        <div className="main-content">

            {/* posts */}
            <div className="posts">
            {posts.map((post, index) => (
                <Post key={index} {...post} />
            ))}
            </div>
        </div>


    </div>
  );
}

export default HomeMajor;
