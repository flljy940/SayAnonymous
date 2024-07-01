// PostContent.js
import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

const PostContent = ({ post, user }) => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/post/${postId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        navigate('/home'); // Redirect to home after deletion
      } else {
        const errorText = await response.text();
        alert(`Error: ${errorText}`);
      }
    } catch (err) {
      alert('Failed to delete post');
      console.error('Error:', err);
    }
  };

  return (
    <div className="post-content">
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      {post.image && <img src={post.image} alt="Post" />}
      <div>
        <span>{post.likes} likes</span>
        <span>{post.comments.length} comments</span>
      </div>
      {user.id === post.userId && (
        <>
          <Link to={`/edit-post/${postId}`}>
            <button>Edit Post</button>
          </Link>
          <button onClick={handleDelete}>Delete Post</button>
        </>
      )}
      {/* Render comments here */}
    </div>
  );
};

export default PostContent;
