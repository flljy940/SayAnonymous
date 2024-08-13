import React, { useEffect, useState } from 'react';
import formatTime from '../assets/formatTime';
import './Post.css';
import CommentSection from './CommentSection';

import likeIcon from '../assets/likes.png';
import likedIcon from '../assets/liked.png';
import saveIcon from '../assets/save.png';
import savedIcon from '../assets/saved.png';
import commentIcon from '../assets/comments.png';

import profile1 from '../assets/profilePics/profile1.png';
import profile2 from '../assets/profilePics/profile2.png';
import profile3 from '../assets/profilePics/profile3.png';
import profile4 from '../assets/profilePics/profile4.png';
import profile5 from '../assets/profilePics/profile5.png';
import profile6 from '../assets/profilePics/profile6.png';
import fallback from '../assets/profilePics/fallback.png';

const avatarMap = {
  1: profile1,
  2: profile2,
  3: profile3,
  4: profile4,
  5: profile5,
  6: profile6,
};

const Post = ({ postId, user, time, content, image, likes: initialLikes = 0, comments: initialComments = [], isLikedByUser, isSavedByUser }) => {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(isLikedByUser);
  const [comments, setComments] = useState(initialComments);
  const [showCommentSection, setShowCommentSection] = useState(false);
  const [saved, setSaved] = useState(isSavedByUser);
  
  useEffect(() => {
    const fetchLikesCount = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/${postId}/likes`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          }
        });
        if (response.ok) {
          const data = await response.json();
          setLikes(data.likes);
        } else {
          console.error('Failed to fetch likes count');
        }
      } catch (error) {
        console.error('Error fetching likes count:', error);
      }
    };

    fetchLikesCount();
  }, [postId]);
  
  const handleLike = async () => {
    try {
      const endpoint = liked ? `http://localhost:5000/api/unlike/${postId}` : `http://localhost:5000/api/like/${postId}`;
      const method = liked ? 'POST' : 'POST';

      const response = await fetch(endpoint, {
        method: method,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postId }),
      });

      if (response.ok) {
        const data = await response.json();
        setLikes(data.likes);
        setLiked(!liked);
      } else {
        console.error(`Failed to ${liked ? 'unlike' : 'like'} post`);
      }
    } catch (error) {
      console.error(`Error ${liked ? 'unliking' : 'liking'} post:`, error);
    }
  };

  const handleSave = async () => {
    try {
      const endpoint = saved ? `http://localhost:5000/api/post/unsave/${postId}` : `http://localhost:5000/api/post/save/${postId}`;
      const method = saved ? 'DELETE' : 'POST';

      const response = await fetch(endpoint, {
        method: method,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postId }),
      });

      if (response.ok) {
        const data = await response.json();
        setSaved(!saved);
      } else {
        console.error(`Failed to ${saved ? 'unsave' : 'save'} post`);
      }
    } catch (error) {
      console.error(`Error ${saved ? 'unsaving' : 'saving'} post:`, error);
    }
  };

  const toggleCommentSection = () => {
    setShowCommentSection((prev) => !prev);
  };

  return (
    <div className="post">
      <div className="post-header">
        {user && (
          <img src={avatarMap[user.avatar] || fallback} alt={user.username} className="post-avatar" />
        )}
        <div className='post-user-info'>
          {user && (
            <>
              <span className="post-user">{user.username}</span>
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
        <div className='post-actions'>
          <img src={liked ? likedIcon : likeIcon} alt='Like' onClick={handleLike} className='icon like-icon' />
          <span>{likes}</span>
          <img src={commentIcon} alt='Comment' onClick={toggleCommentSection} className='icon comment-icon' />
          <span>{comments.length}</span>
          <img src={saved ? savedIcon : saveIcon} alt='Save' onClick={handleSave} className='icon save-icon' />
        </div>
        <div>
          {showCommentSection && (
            <CommentSection postId={postId} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
