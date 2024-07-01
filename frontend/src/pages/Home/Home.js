import React, { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import SideBar from '../../components/SideBar';
import Tabs from '../../components/Tabs';
import './Home.css';
import { response } from 'express';

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
       console.error('No token found. Please log in.');
       setLoadingPosts(false);
       return;
    }

    try {
      const response = await fetch (`http://localhost:5000/api/home/top`, {
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
      setPosts(data);
    } catch (error) {
      console.error('Error fetching top posts', error);
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

      {/* <div className="posts">
        {posts.map((post) => {
          <li key={post.id}>
            <div>
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              {post.image && <img scr={post.image} alt="Post" />}
              <p>By {post.user.pseudonym}</p>
              <p>{new DataTransfer(post.time).toLocalString()}</p>
            </div>
          </li>
        })}
      </div> */}
        
      <Outlet />
    </nav>
  );
};

export default Home;
