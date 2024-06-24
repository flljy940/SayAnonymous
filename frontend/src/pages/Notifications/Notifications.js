import React from 'react';
import './Notifications.css';
import { Link, Outlet } from 'react-router-dom';
import SideItem from '../../components/SideItem';
import Message from '../../components/Message';

const Notifications = () => {
  const messages = [
    {
        user: { name: 'friend1', avatar: 'avatar1.png' },
        time: '3 min ago',
        content: "hi how have you been recently",
        image: 'post-image1.jpg',
      },
      {
        user: { name: "What'sUp", avatar: 'avatar2.png' },
        time: '2 hrs ago',
        content: 'Do you wanna travel together',
      },
      {
        user: { name: 'follower', avatar: 'avatar1.png' },
        time: '3 min ago',
        content: "Hope everything's okay after PA :)",
        image: 'post-image1.jpg',
      },
      {
        user: { name: "What'sUp", avatar: 'avatar2.png' },
        time: '2 hrs ago',
        content: 'We should meet up some time',
      },
  ];

  return (
    <nav className="container">
      <title>SayAnonymous</title>

      {/* Sidebar */}
      <div className='leftbar'>
        <div className="leftsidebar"></div>
        <div className="leftsideitem">
          <span className='sidename'>SayAnonymous</span>
          <SideItem picName="home" name="Home" path="/pages/home/*" clicked="n" />
          <SideItem picName="notifications" name="Notifications" path="/pages/home/*" clicked="y" />
          <SideItem picName="home" name="Saved" path="/pages/savedposts" clicked="n" />
          <SideItem picName="settings" name="Settings" path="/pages/settings/*" clicked="n" />
        </div>
      </div>

      {/* Main content */}
      <div className="main-content">
        {/* Posts */}
        <div className="posts">
          {messages.map((message, index) => (
            <Message key={index} {...message} />
          ))}
        </div>
      </div>
        <Outlet />
      </nav>
  );
}

export default Notifications;
