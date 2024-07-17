import React, { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import SideBar from '../../components/SideBar';
import Tabs from '../../components/Tabs';
import Post from '../../components/Post';
import SideItem from '../../components/SideItem';
import Person from '../../components/Person';
import './Home.css';

const Home = () => {
  const homeTabs = [
    { label: 'Top', path: 'top' },
    { label: 'New', path: 'new' },
  ];

  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);

  // Fetch posts from the server
  const fetchPosts = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
       console.log('No token found. Please log in.');
       setLoadingPosts(false);
       return;
    }

    try {
      const response = await fetch (`http://localhost:5000/api/home`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorDetails = await response.json();
        throw new Error(errorDetails.error || 'Failed to fetch top posts');
      }

      const data = await response.json();

      // Ensure the data is an array
      if (Array.isArray(data)) {
        setPosts(data);
      } else {
        console.error('Data fetched is not an array:', data);
        setPosts([]);
      }
    } catch (error) {
      console.error('Error fetching top posts', error);
    } finally {
      setLoadingPosts(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loadingPosts) {
    return <div className="alert">Loading...</div>;
  }

  return (
    <nav className="container">
      {/* Sidebar */}
        <SideBar />


      {/* tabs for home page */}
      <Tabs tabs={homeTabs} />

      <div className="posts">
        {posts.map(post => (
          <Post 
            key={post.id} 
            user={post.user}
            time={post.time}
            image={post.imagePath}
            content={post.content}
            tags={post.tags}
            likes={post.likes}
            comments={post.comments}
          />
            // <div>
            //   <h3>{post.title}</h3>
            //   <p>{post.content}</p>
            //   {post.image && <img scr={post.image} alt="Post" />}
            //   <p>By {post.user.pseudonym}</p>
            //   <p>{new Date(post.time).toLocaleString()}</p>
            // <div>
          // />
        ))}
      </div>
        
      <Outlet />
    </nav>
  );
};

export default Home;
