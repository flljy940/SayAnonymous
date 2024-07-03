// PostContent.js
import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

const PostContent = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPostContent = async () => {
      try {
        const response = await fetch (`http://localhost:5000/api/post/${postId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.ok) {
          const postData = await response.json();
          setPost(postData);
        } else {
          console.error('Failed to fetch post content:', response.statusText);
        }
      } catch (error) {
        console.error('Fetch post content error:', error);
        throw error;
      }
    };

    const fetchUserData = async () => {
      try {
        const response = await fetch (`http:/localhost:5000/api/profile`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          console.error('Failed to fetch user data:', response.statusText);
        }
      } catch (error) {
        console.error('Fetch user data error:', error);
        throw error;
      }
    };

    fetchPostContent();
    fetchUserData();
  }, [postId]);

  const handleDelete = async (postId) => {
    try {
      const response = await fetch(`/api/post/${postId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
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

  if (!post || !user) {
    return <div>Loading...</div>
  }

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
          <button onClick={() => handleDelete(post.id)}>Delete Post</button>
        </>
      )}
      {/* Render comments here */}
    </div>
  );
};

export default PostContent;
