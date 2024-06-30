import * as React from "react";
import { Link, Outlet } from "react-router-dom";
import './Profile.css';
import ProfileCard from "./ProfileCard";

function ProfileBase() {
  return (
    <div className="content-container">
      <title>SayAnonymous</title>
      <div className="main-content">
        
        <div className="profile-section">
          <div className="profile-card-container">
            <ProfileCard 
              user={{ username: 'mee', avatar: require('../../../assets/profilePics/profile3.png') }}
              username="Makysimnickname" 
              level="1" 
              exp="4" 
              maxExp="50"
            />
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
