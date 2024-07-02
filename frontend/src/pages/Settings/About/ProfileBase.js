import React, { useEffect, useState } from 'react';
import { Link, Outlet } from "react-router-dom";
import './Profile.css';
import ProfileCard from "./ProfileCard";

const ProfileBase = () => {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch (`http://localhost:5000/api/profile`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify(),
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          console.error('Failed to fetch user data:', response.statusText);
        }
      } catch (error) {
        console.error('Fetch user data error:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="content-container">
      <title>SayAnonymous</title>
      <div className="main-content">
        
        <div className="profile-section">
          <div className="profile-card-container">
            {user && (
              <ProfileCard 
                user={user}
                username={user.username}
                level={user.level}
                exp={user.exp}
                maxExp="50"
              />
            )}
          </div>

          <div className="info-section">
            <div className="feedback-box">
              <h3>Feedback</h3>
              <div className="exp-link">{'>>>'}</div>
            </div>
            <div className="stats-box">
              <h3>Statistics</h3>
              <Link to="/pages/settings/stats" className="exp-link">{'>>>'}</Link>
            </div>
          </div>

        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default ProfileBase;
