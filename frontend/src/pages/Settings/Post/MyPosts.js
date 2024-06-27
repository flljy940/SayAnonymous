import React, { useEffect, useState } from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';
import './MyPosts.css';
import SideBar from '../../../components/SideBar';
import Post from '../../../components/Post';

const MyPosts = () => {
  const { userId } = useParams(); // Assuming you have userId from the route params
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/profile/${userId}/posts`, {
          method: 'GET',
        });

        if (response.ok) {
          const data = await response.json();
          setPosts(data);
        } else {
          const errorText = await response.text();
          setError(`Error: ${errorText}`);
        }
      } catch (err) {
        setError('Failed to fetch');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [userId]);
  
  if (loading) {
    <alert>Loading</alert>;
  }

  if (error) {
    <alert>{error}</alert>;
  }

  const posts1 = [
    {
        user: { name: 'mee', avatar: require('../../../assets/profilePics/profile3.png') },
        time: '2024-06-12',
        content: "See all your past posts",
        image: 'post-image1.jpg',
        likes: 21,
        comments: 4,
      },
      {
        user: { name: "mee", avatar: require('../../../assets/profilePics/profile3.png') },
        time: '2 hrs ago',
        content: 'Thinking of traveling to Indonesia...',
        likes: 5,
        comments: 1,
      },
      {
        user: { name: 'mee', avatar: require('../../../assets/profilePics/profile3.png') },
        time: '3 min ago',
        content: "Hope everything's okay after PA :)",
        image: 'post-image1.jpg',
        likes: 21,
        comments: 4,
      },
      {
        user: { name: "mee", avatar: require('../../../assets/profilePics/profile3.png') },
        time: '2 hrs ago',
        content: 'Thinking of traveling to Indonesia...',
        likes: 5,
        comments: 1,
      },
      {
        user: { name: 'mee', avatar: require('../../../assets/profilePics/profile3.png') },
        time: '3 min ago',
        content: "Hope everything's okay after PA :)",
        image: 'post-image1.jpg',
        likes: 21,
        comments: 4,
      },

  ];

  return (
    <nav className="content-container">
      <title>SayAnonymous</title>


      {/* Main content */}
      <div className="main-content">
        {/* Posts */}
        <div className='inRow'>
        <div className="posts">
          {posts.map((post, index) => (
            <Post key={index} {...post} />
          ))}
        </div>
        <button className='createPost'>
          <Link to="/pages/settings/newpost">
            + Create a post
          </Link>
        </button>
        </div>
      </div>
      <Outlet />
    </nav>
  );
};

export default MyPosts;
