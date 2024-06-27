import React, { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import SideBar from '../../components/SideBar';
import SideItem from '../../components/SideItem';
import Post from '../../components/Post';
import Person from '../../components/Person';
import Topic from '../../components/Topic';
import './Home.css';

const HomeTop = () => {
  const sideItems = [
    { name: 'Home', file: '../assets/profilePics/profile1.png' },
    { name: 'Search', file: 'search-icon.png' },
    { name: 'Notifications', file: 'notifications-icon.png' },
    { name: 'Saved posts', file: 'saved-posts-icon.png' },
    { name: 'Settings', file: 'settings-icon.png' },
  ];

  const [posts, setPosts] = useState([]);
  const [suggestedPeople, setSuggestedPeople] = useState([]);
  const [suggestedTopics, setSuggestedTopics] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [loadingPeople, setLoadingPeople] = useState(true);
  const [loadingTopics, setLoadingTopics] = useState(true);

  // Fetch posts from the server
  const fetchPosts = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('No token found. Please log in.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/home/top`, {
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
    } finally {
      setLoadingPosts(false);
    }
  };

  // Fetch suggested people
  const fetchSuggestedPeople = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/suggestions/people', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch suggested people');
      }

      const data = await response.json();
      setSuggestedPeople(data);
    } catch (error) {
      console.error('Error getting suggested people:', error);
    } finally {
      setLoadingPeople(false);
    }
  };

  // Fetch suggested topics
  const fetchSuggestedTopics = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/suggestions/topics', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch suggested topics');
      }

      const data = await response.json();
      setSuggestedTopics(data);
    } catch (error) {
      console.error('Error getting suggested topics:', error);
    } finally {
      setLoadingTopics(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchPosts();
    fetchSuggestedPeople();
    fetchSuggestedTopics();
  }, []);

  return (
    <div className="container">
      <div className="main-content">
        {loadingPosts ? (
          <p>Loading posts...</p>
        ) : (
          <div className="posts">
            {posts.map((post) => (
              <Post key={post.id} {...post} />
            ))}
          </div>
        )}
      </div>
      <div className="right-sidebar">
        <div className="suggested-section">
          <h3>Suggested people</h3>
          {loadingPeople ? (
            <p>Loading suggested people...</p>
          ) : (
            suggestedPeople.map((person, index) => (
              <Person key={index} user={person} />
            ))
          )}
        </div>
        <div className="suggested-section">
          <h3>Topics you might like</h3>
          {loadingTopics ? (
            <p>Loading suggested topics...</p>
          ) : (
            suggestedTopics.map((topic, index) => (
              <Topic key={index} topic={topic} />
            ))
          )}
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default HomeTop;
