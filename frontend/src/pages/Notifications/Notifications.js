// NotificationsPage.js
import React, { useEffect, useState } from 'react';
import SideBar from '../../components/SideBar';
import Message from '../../components/Message';
import './Notifications.css';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch('/api/notifications', {
          method: 'GET',
        });

        if (response.ok) {
          const data = await response.json();
          setNotifications(data);
        } else {
          const errorText = await response.text();
          setError(`Error: ${errorText}`);
        }
      } catch (err) {
        setError('Failed to fetch notifications');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  if (loading) {
    <alert>loading</alert>
  }

  if (error) {
    <alert>{error}</alert>
  }

  return (
    <div className="notifications-page">
      <SideBar />
      <div className="main-content">
        <div className="header">
          <h1>Notifications</h1>
          <button className="mark-all-read">Mark all Read</button>
        </div>
        <div className="notifications-list">
          {notifications.map((notification, index) => (
            <Message key={index} {...notification} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
