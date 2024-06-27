import React, { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import SideBar from '../../components/SideBar';
import Post from '../../components/Post';
import Person from '../../components/Person';
import Topic from '../../components/Topic';
import './Home.css';

const HomeTop = () => {
  const [posts, setPosts] = useState([]);
  const [suggestedPeople, setSuggestedPeople] = useState([]);
  const [suggestedTopics, setSuggestedTopics] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [loadingPeople, setLoadingPeople] = useState(true);
  const [loadingTopics, setLoadingTopics] = useState(true);

  // Fetch posts from the server
  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/home/top', {
        method: 'GET',
      });
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      } else {
        const error = await response.text();
        alert(`Error: ${error}`);
      }
    } catch (error) {
      alert('Failed to fetch posts');
      console.error('Error:', error);
    } finally {
      setLoadingPosts(false);
    }
  };

  // Fetch suggested people
  const fetchSuggestedPeople = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/suggestions/people', {
        method: 'GET',
      });
      if (response.ok) {
        const data = await response.json();
        setSuggestedPeople(data);
      } else {
        const error = await response.text();
        alert(`Error: ${error}`);
      }
    } catch (error) {
      alert('Failed to fetch suggested people');
      console.error('Error:', error);
    } finally {
      setLoadingPeople(false);
    }
  };

  // Fetch suggested topics
  const fetchSuggestedTopics = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/suggestions/topics', {
        method: 'GET',
      });
      if (response.ok) {
        const data = await response.json();
        setSuggestedTopics(data);
      } else {
        const error = await response.text();
        alert(`Error: ${error}`);
      }
    } catch (error) {
      alert('Failed to fetch suggested topics');
      console.error('Error:', error);
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

  const posts1 = [
    {
      user: { name: 'love2030', avatar: require('../../assets/profilePics/profile1.png')},
      time: '3 min ago',
      content: "Hope everything's okay after PA :)",
      image: 'post-image1.jpg',
      likes: 21,
      comments: 4,
    },
    {
      user: { name: "What'sUp", avatar: require('../../assets/profilePics/profile2.png') },
      time: '2 hrs ago',
      content: 'Thinking of traveling to Indonesia...',
      likes: 5,
      comments: 1,
    },
  ];
  const suggestedPeople1 = [
    { name: 'love2030', username: 'love2030', avatar: require('../../assets/profilePics/profile1.png') },
    { name: 'StraightA', username: 'StraightA', avatar: require('../../assets/profilePics/profile2.png') },
    { name: 'Danni', username: 'Danni', avatar: require('../../assets/profilePics/profile3.png') },
    { name: 'SoCguy', username: 'SoCguy', avatar: require('../../assets/profilePics/profile4.png') },
    { name: '404NotFound', username: '404NotFound', avatar: require('../../assets/profilePics/profile5.png') },
  ];
  const suggestedTopics1 = [
    { name: 'WhatAboutCoding', members: '2.1k' },
    { name: 'Photographers', members: '2k' },
    { name: 'LoveStories', members: '125' },
  ];

  return (
    <nav className="container">
      {/* Sidebar */}

      {/* Home main content */}
      <div className="main-content">

        {/* Posts */}
        <div>
          {loadingPosts ? (
            <p>Loading posts...</p>
          ) : (
            <div className="posts">
              {posts.map((post, index) => (
                <Post key={index} {...post} />
              ))}
            </div>
          )}
        </div>

        {/* Right sidebar */}
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
      </div>
      <Outlet />
    </nav>
  );
};

export default HomeTop;
