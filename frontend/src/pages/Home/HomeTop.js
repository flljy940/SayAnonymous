// HomeTop.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SideItem from '../../components/SideItem';
import Person from '../../components/Person';
import Post from '../../components/Post';
import Topic from '../../components/Topic';
import HomeNew from './HomeNew';
import HomeMajor from './HomeMajor';
import './Home.css';

const HomeTop = () => {
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
    <Router>
      <div className="container">
        <div className="sidebar">
          {sideItems.map((item, index) => (
            <SideItem key={index} file={item.file} name={item.name} />
          ))}
        </div>
        <div className="main-content">
          <div className="tabs">
            <span>NUS</span>
            <span className="active-tab">Top</span>
            <Link to="/home/new"><span>New</span></Link>
            <span>SoC</span>
            <span>CHS</span>
          </div>
          <div className="posts">
            {posts.map((post, index) => (
              <Post key={index} {...post} />
            ))}
          </div>
        </div>
        <div className="right-sidebar">
          <div className="suggested-section">
            <h3>Suggested people</h3>
            {suggestedPeople.map((person, index) => (
              <Person key={index} user={person} />
            ))}
          </div>
          <div className="suggested-section">
            <h3>Topics you might like</h3>
            {suggestedTopics.map((topic, index) => (
              <Topic key={index} topic={topic} />
            ))}
          </div>
        </div>
        <Routes>
          <Route path="/home/new" element={<HomeNew />} />
          <Route path="/home/major" element={<HomeMajor />} />
        </Routes>
      </div>
    </Router>
  );
}

export default HomeTop;
