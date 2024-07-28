import React, { useEffect, useState } from 'react';
import './CommentSection.css';

const CommentSection = ({ postId }) => {
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
  
    const fetchComments = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/comments/${postId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setComments(Array.isArray(data) ? data : []);
        } else {
          console.error('Failed to fetch comments');
          setComment([]);
        }
      } catch (error) {
        console.error('Error fetching comments:', error);
        setComment([]);
      }
    };
  
    useEffect(() => {
      fetchComments();
    }, [postId]);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (comment.trim()) {
        try {
          const response = await fetch(`http://localhost:5000/api/comments/${postId}`, { 
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({ comment }),
          });
          if (response.ok) {
            const data = await response.json();
            setComments((prevComments) => [data.comment, ...prevComments]);
            setComment('');
          } else {
            console.error('Failed to add comment');
          }
        } catch (error) {
          console.error('Error adding comment:', error);
        }
      }
    };
  
    return (
      <div className='comment-section'>
        <form onSubmit={handleSubmit} className='comment-form'>
          <input
            type='text'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder='Add a comment'
            className='comment-input'
          />
          <button type='submit' className='comment-button'>Comment</button>
        </form>
        <div className='comments-list'>
          {comments.map((comment) => {
            <div key={comment.id} className='comment'>
              {comment.comment}
            </div>
          })}
        </div>
      </div>
    );
  };  

  export default CommentSection;