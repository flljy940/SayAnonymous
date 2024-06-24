// Home.js
import React from 'react';
import SideItem from '../../components/SideItem';
import Person from '../../components/Person';
import Post from '../../components/Post';
import Topic from '../../components/Topic';
import './Home.css';
import { Link } from 'react-router-dom';

const HomeMajor = () => {
  const sideItems = [
    { name: 'Home', file: '../assets/profilePics/profile1.png' },
    { name: 'Search', file: 'search-icon.png' },
    { name: 'Notifications', file: 'notifications-icon.png' },
    { name: 'Saved posts', file: 'saved-posts-icon.png' },
    { name: 'Settings', file: 'settings-icon.png' },
  ];

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

  const suggestedPeople = [
    { name: 'love2030', username: 'love2030', avatar: '../assets/profilePics/profile1.png' },
    { name: 'StraightA', username: 'StraightA', avatar: '../assets/profilePics/profile2.png' },
    { name: 'Danni', username: 'Danni', avatar: '../assets/profilePics/profile3.png' },
    { name: 'SoCguy', username: 'SoCguy', avatar: '../assets/profilePics/profile4.png' },
    { name: '404NotFound', username: '404NotFound', avatar: '../assets/profilePics/profile5.png' },
  ];

  const suggestedTopics = [
    { name: 'WhatAboutCoding', members: '2.1k' },
    { name: 'Photographers', members: '2k' },
    { name: 'LoveStories', members: '125' },
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
            <div className="tabs">
            <span>NUS</span>
              <span>
                <Link to="/pages/home/*" className="toClick">
                  Top
                </Link>
              </span>
              
              <span>
                <Link to="/pages/home/new" className="toClick">
                  New
                </Link>
              </span>

              <span className="active-tab">
                <Link to="/pages/home/major" className="clicked">
                  Majors
                </Link>
              </span>
            </div>

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
