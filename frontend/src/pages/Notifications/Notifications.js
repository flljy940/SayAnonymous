import React, { useEffect, useState } from 'react';
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
  
  /*
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await fetch (`http://localhost:5000/api/notifications`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch notifications');
      }

      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const markAsRead = async (id) => {
    try {
      const response = await fetch (`http://localhost:5000/api/notications/read/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        const errorDetails = await response.json();
        throw new Error(errorDetails.error || 'Failed to mark notifications as read');
      }

      fetchNotifications();
    } catch (error) {
      console.error('Error marking notifications as read:', error);
      throw error;
    }
  };
  */

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
          {/* {messages.map(message => ( */}
            {/* <Message key={message.id}> */}
              {/* <p>{message.message}</p> */}
              {/* <button onClick={() => markAsRead(message.id)}>Mark as Read</button> */}
            {/* </li> */}
          {/* ))} */}
          {messages.map((message, index) => {
            <Message key={index} {...message} />
          })}
        </div>
      </div>
        <Outlet />
      </nav>
  );
}

export default Notifications;
