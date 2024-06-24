// Post.js
import React from 'react';
import './Message.css';

const Message = ({ user, time, content }) => {
  return (
    <div className="post">
      <div className="post-header">
        <img src={user.avatar} alt={user.name} className="post-avatar" />
        <div className='message-info'>
          <span className="post-user">{user.name}</span>
          <span className="post-time">{time}</span>
        </div>
      </div>
      <div className="post-content">{content}</div>
      <div>Reply</div>
    </div>
  );
}

export default Message;
