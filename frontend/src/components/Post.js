// Post.js
import React from 'react';
import './Post.css';

const Post = ({ user, time, content, image, likes, comments }) => {
  return (
    <div className="post">
      <div className="post-header">
        <img src={user.avatar} alt={user.name} className="post-avatar" />
        <div>
          <span className="post-user">{user.name}</span>
          <span className="post-time">{time}</span>
        </div>
      </div>
      {image && <img src={image} alt="Post" className="post-image" />}
      <div className="post-content">{content}</div>
      <div className="post-footer">
        <span>{likes} likes</span>
        <span>{comments} comments</span>
      </div>
    </div>
  );
}

export default Post;
