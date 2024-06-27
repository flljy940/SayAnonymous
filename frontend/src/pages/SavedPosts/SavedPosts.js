import React, { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import Post from '../../components/Post';
import SideBar from '../../components/SideBar';
import './SavedPosts.css';

const SavedPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('No token found. Please log in.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/post/posts/saved`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorDetails = await response.json();
        throw new Error(errorDetails.error || 'Failed to fetch saved posts');
      }

      const data = await response.json();
      console.log('Data:', data);
      setPosts(data);
    } catch (error) {
      console.error('Error fetching saved posts', error);
    }
  };

  const SuggestedPeople = () => {
    const [people, setPeople] = useState([]);

    useEffect(() => {
      fetchSuggestedPeople();
    }, []);

    const fetchSuggestedPeople = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/suggestions/people`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch');
        }

        const data = await response.json();
        setPeople(data);
      } catch (error) {
        console.error('Error getting suggested people:', error);
      }
    };

    return (
      <div className="suggested-people">
        <h2>Suggested People</h2>
        <ul>
          {people.map((person, index) => (
            <li key={index}>
              <Link to={`/profile/${person.username}`}>{person.username}</Link>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const SuggestedTopics = () => {
    const [topics, setTopics] = useState([]);

    useEffect(() => {
      fetchSuggestedTopics();
    }, []);

    const fetchSuggestedTopics = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/suggestions/topics`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch');
        }

        const data = await response.json();
        setTopics(data);
      } catch (error) {
        console.error('Error getting suggested topics:', error);
      }
    };

    return (
      <div className="suggested-topics">
        <h2>Suggested Topics</h2>
        <ul>
          {topics.map((topic, index) => (
            <li key={index}>
              <Link to={`/topic/${topic.name}`}>{topic.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="container">
      <title>SayAnonymous</title>

      {/* Sidebar */}
      <SideBar />

      {/* Main content */}
      <div className="main-content">
        <h1>Saved Posts</h1>
        <div className="post-list">
          <ul>
            {posts.map((post) => (
              <li key={post.id}>
                <Post {...post} />
              </li>
            ))}
          </ul>
        </div>
        <SuggestedPeople />
        <SuggestedTopics />
      </div>
      <Outlet />
    </div>
  );
};

export default SavedPosts;
