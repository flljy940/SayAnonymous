import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NewPost from '../Settings/Post/NewPost';

const EditPost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/post/${postId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setPost(data);
        } else {
          const errorText = await response.text();
          setError(`Error: ${errorText}`);
        }
      } catch (err) {
        setError('Failed to fetch post');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  const handleSave = async (updatedPost) => {
    try {
      const response = await fetch(`http://localhost:5000/api/post/edit/${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(updatedPost),
      });

      if (response.ok) {
        navigate(`/post/${postId}`);
      } else {
        const errorText = await response.text();
        alert(`Error: ${errorText}`);
      }
    } catch (err) {
      alert('Failed to save post');
      console.error('Error:', err);
    }
  };

  if (loading) return <p>Loading post...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Edit Post</h1>
      {post && <NewPost post={post} onSave={handleSave} />}
    </div>
  );
};

export default EditPost;
