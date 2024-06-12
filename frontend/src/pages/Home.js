// Home.js
import React from 'react';
import SideItem from '../components/SideItem';
import Post from '../components/Post';
import Person from '../components/Person';
import Topic from '../components/Topic';
import './Home.css';

const Home = () => {
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
    { name: 'love2030', username: 'love2030', avatar: 'avatar1.png' },
    { name: 'StraightA', username: 'StraightA', avatar: 'avatar2.png' },
    { name: 'Danni', username: 'Danni', avatar: 'avatar3.png' },
    { name: 'SoCguy', username: 'SoCguy', avatar: 'avatar4.png' },
    { name: '404NotFound', username: '404NotFound', avatar: 'avatar5.png' },
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
            <h1 className="name">SayAnonymous</h1>
          </div>
        </div>

        {/* side bar */}
        <div className="sidebar">
            {sideItems.map((item, index) => (
            <SideItem key={index} file={item.file} name={item.name} />
            ))}
        </div>

        {/* main content */}
        <div className="main-content">
            <div className="tabs">
            <span>NUS</span>
            <span className="active-tab">Top</span>
            <span>New</span>
            <span>SoC</span>
            <span>CHS</span>
            </div>

            {/* posts */}
            <div className="posts">
            {posts.map((post, index) => (
                <Post key={index} {...post} />
            ))}
            </div>
        </div>

        {/* right suggestions */}
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
    </div>
  );
}

export default Home;
