// Home.js
import React from 'react';
import Post from '../../components/Post';
import './Home.css';

const HomeMajor = () => {
 {/* id, user, time, content, image, likes, comments */}
  const posts = [
    {
      id: '3313',
      user: { name: 'love2030', avatar: 'avatar1.png' },
      time: '3 min ago',
      content: "Hope everything's okay after PA :)",
      image: 'post-image1.jpg',
      likes: 21,
      comments: 4,
    },
    {
      id: '3314',
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
