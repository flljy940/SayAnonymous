// Message.js
import React from 'react';
import './Message.css';

const Message = ({ type, message, time }) => {
  const getIcon = () => {
    switch (type) {
      case 'Trending':
        return '🔥'; // Trending icon
      case 'Comment':
        return '💬'; // Comment icon
      case 'Upvote':
        return '⬆️'; // Upvote icon
      default:
        return 'ℹ️'; // Default icon
    }
  };

  return (
    <div className="notification-item">
      <div className="icon">{getIcon()}</div>
      <div className="details">
        <span className="type">{type}</span>
        <span className="message">{message}</span>
        <span className="time">{time}</span>
      </div>
    </div>
  );
};

export default Message;
