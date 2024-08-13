import React, { useEffect, useState } from 'react';
import { Link, Outlet } from "react-router-dom";
import './Profile.css';
import ProfileCard from "./ProfileCard";

import profile1 from '../../../assets/profilePics/profile1.png';
import profile2 from '../../../assets/profilePics/profile2.png';
import profile3 from '../../../assets/profilePics/profile3.png';
import profile4 from '../../../assets/profilePics/profile4.png';
import profile5 from '../../../assets/profilePics/profile5.png';
import profile6 from '../../../assets/profilePics/profile6.png';

const avatarMap = {
  1: profile1,
  2: profile2,
  3: profile3,
  4: profile4,
  5: profile5,
  6: profile6,
};

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
          userData.avatar = avatarMap[userData.avatar] || null;
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
                avatar={user.avatar}
                username={user.username}
                level={user.level}
                exp={user.exp}
              />
            )}
          </div>

          <div className="info-section">
            <div className="feedback-box">
              <h3>Feedback</h3>
              <Link to="/pages/settings/feedback" className="exp-link">{'>>>'}</Link>
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
