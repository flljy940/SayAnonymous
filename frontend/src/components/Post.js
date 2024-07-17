import React from 'react';
import formatTime from '../assets/formatTime';
import './Post.css';

import profile1 from '../assets/profilePics/profile1.png';
import profile2 from '../assets/profilePics/profile2.png';
import profile3 from '../assets/profilePics/profile3.png';
import profile4 from '../assets/profilePics/profile4.png';
import profile5 from '../assets/profilePics/profile5.png';
import profile6 from '../assets/profilePics/profile6.png';

const avatarMap = {
  1: profile1,
  2: profile2,
  3: profile3,
  4: profile4,
  5: profile5,
  6: profile6,
};

const Post = ({ id, user, time, content, image, likes, comments }) => {

  return (
    <div className="post">
      <div className="post-header">
        {user && (
          <img src={avatarMap[user.avatar]} alt={user.username} className="post-avatar" />
        )}
        <div className='post-user-info'>
          {user && (
            <>
              <span className="post-user">{user.pseudonym}</span>
              <span className="post-time">{formatTime(time)}</span>
            </>
          )}
        </div>
      </div>
      <div className='post-body'>
      <div className="post-content">
      <p>{content}</p>
        {image && <img src={image} alt="Post" className='post-image'/>}
      </div>
      </div>
      <div className="post-footer">
        <span className='post-likes'>{likes} ❤️</span>
        <span className='post-comments'>{comments} 💬</span>
      </div>
    </div>
  );
}

export default Post;
