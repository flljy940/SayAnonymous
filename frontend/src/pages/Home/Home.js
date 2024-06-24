import React from 'react';
import Post from '../../components/Post';
import './Home.css';
import { Link, Outlet } from 'react-router-dom';
import SideItem from '../../components/SideItem';
import Person from '../../components/Person';
import Topic from '../../components/Topic';

const Home = () => {
  const posts = [
    {
        user: { name: 'love2030', avatar: require('../../assets/profilePics/profile6.png') },
        time: '3 min ago',
        content: "Hope everything's okay after PA :)",
        image: 'post-image1.jpg',
        likes: 21,
        comments: 4,
      },
      {
        user: { name: "What'sUp", avatar: require('../../assets/profilePics/profile2.png') },
        time: '2 hrs ago',
        content: 'Thinking of traveling to Indonesia...',
        likes: 5,
        comments: 1,
      },
      {
        user: { name: 'love2030', avatar: require('../../assets/profilePics/profile5.png') },
        time: '3 min ago',
        content: "Hope everything's okay after PA :)",
        image: 'post-image1.jpg',
        likes: 21,
        comments: 4,
      },
      {
        user: { name: "What'sUp", avatar: require('../../assets/profilePics/profile1.png') },
        time: '2 hrs ago',
        content: 'Thinking of traveling to Indonesia...',
        likes: 5,
        comments: 1,
      },
      {
        user: { name: 'love2030', avatar: require('../../assets/profilePics/profile6.png') },
        time: '3 min ago',
        content: "Hope everything's okay after PA :)",
        image: 'post-image1.jpg',
        likes: 21,
        comments: 4,
      },
      {
        user: { name: "What'sUp", avatar: require('../../assets/profilePics/profile2.png') },
        time: '2 hrs ago',
        content: 'Thinking of traveling to Indonesia...',
        likes: 5,
        comments: 1,
      },
      {
        user: { name: 'love2030', avatar: require('../../assets/profilePics/profile6.png') },
        time: '3 min ago',
        content: "Hope everything's okay after PA :)",
        image: 'post-image1.jpg',
        likes: 21,
        comments: 4,
      },
      {
        user: { name: "What'sUp", avatar: require('../../assets/profilePics/profile3.png') },
        time: '2 hrs ago',
        content: 'Thinking of traveling to Indonesia...',
        likes: 5,
        comments: 1,
      },
      {
        user: { name: 'love2030', avatar: require('../../assets/profilePics/profile5.png') },
        time: '3 min ago',
        content: "Hope everything's okay after PA :)",
        image: 'post-image1.jpg',
        likes: 21,
        comments: 4,
      },
      {
        user: { name: "What'sUp", avatar: require('../../assets/profilePics/profile5.png') },
        time: '2 hrs ago',
        content: 'Thinking of traveling to Indonesia...',
        likes: 5,
        comments: 1,
      },
      {
        user: { name: 'love2030', avatar: require('../../assets/profilePics/profile1.png') },
        time: '3 min ago',
        content: "Hope everything's okay after PA :)",
        image: 'post-image1.jpg',
        likes: 21,
        comments: 4,
      },
      {
        user: { name: "What'sUp", avatar: require('../../assets/profilePics/profile2.png') },
        time: '2 hrs ago',
        content: 'Thinking of traveling to Indonesia...',
        likes: 5,
        comments: 1,
      },
  ];

  const suggestedPeople = [
    { name: 'love2030', username: 'love2030', avatar: require('../../assets/profilePics/profile1.png') },
    { name: 'StraightA', username: 'StraightA', avatar: require('../../assets/profilePics/profile2.png') },
    { name: 'Danni', username: 'Danni', avatar: require('../../assets/profilePics/profile3.png') },
    { name: 'SoCguy', username: 'SoCguy', avatar: require('../../assets/profilePics/profile4.png') },
    { name: '404NotFound', username: '404NotFound', avatar: require('../../assets/profilePics/profile5.png') },
  ];  

  const suggestedTopics = [
    { name: 'WhatAboutCoding', members: '2.1k' },
    { name: 'Photographers', members: '2k' },
    { name: 'LoveStories', members: '125' },
  ];

  return (
    <nav className="container">

      {/* Sidebar */}
      <div className='leftbar'>
        <div className="leftsidebar"></div>
        <div className="leftsideitem">
          <span className='sidename'>SayAnonymous</span>
          <SideItem picName="home" name="Home" path="/pages/home/*" clicked="y" />
          <SideItem picName="notifications" name="Notifications" path="/pages/notifications" clicked="n" />
          <SideItem picName="home" name="Saved" path="/pages/savedposts" clicked="n" />
          <SideItem picName="settings" name="Settings" path="/pages/settings/*" clicked="n" />
        </div>
      </div>

      {/* Home中间的内容 */}
      <div className="main-content">
        {/* 顶端菜单栏 */}
        <div className="tabs">
          <span>NUS</span>
          <span className="active-tab">
            <Link to="*" className="clicked">
              Top
            </Link>
          </span>
          <span>
            <Link to="new" className="toClick">
              New
            </Link>
          </span>
          <span className="tab">
            <Link to="major" className="toClick">
              Majors
            </Link>
          </span>
        </div>
        {/* 帖子 */}
        <div>
          <div className="posts">
          {posts.map((post, index) => (
            <Post key={index} {...post} />
          ))}
          </div>
        </div>
      
        {/* 右边推荐的部分 */}
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
        <Outlet />
      </nav>
  );
}

export default Home;
