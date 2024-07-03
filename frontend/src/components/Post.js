import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Post.css';

const Post = ({ id, user, time, content, image, likes, comments }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/post/${id}`);
  };

  return (
    <div className="post" onClick={handleClick}>
      <div className="post-header">
        {user && (
          <img src={user.avatar} alt={user.name} className="post-avatar" />
        )}
        <div>
          {user && (
            <>
              <span className="post-user">{user.name}</span>
              <span className="post-time">{time}</span>
            </>
          )}
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
