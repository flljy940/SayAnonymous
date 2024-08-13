import React from 'react';
import { Link } from 'react-router-dom';
import './Card.css';

import profile1 from '../../../assets/profilePics/profile1.png';
import profile2 from '../../../assets/profilePics/profile2.png';
import profile3 from '../../../assets/profilePics/profile3.png';
import profile4 from '../../../assets/profilePics/profile4.png';
import profile5 from '../../../assets/profilePics/profile5.png';
import profile6 from '../../../assets/profilePics/profile6.png';

const avatarMap = [
  { id: 1, url: profile1 },
  { id: 2, url: profile2 },
  { id: 3, url: profile3 },
  { id: 4, url: profile4 },
  { id: 5, url: profile5 },
  { id: 6, url: profile6 },
];

const levelRule = [
  { level: 1, exp: 100 },
  { level: 2, exp: 300 },
  { level: 3, exp: 800 },
  { level: 4, exp: 1500 },
  { level: 5, exp: 2400 },
  { level: 6, exp: 4000 },
];

const getMaxExp = (currentLevel) => {
  const currentLevelReq = levelRule.find(level => level.level === currentLevel);
  return currentLevelReq ? currentLevelReq.exp : 0;
}

const ProfileCard = ({ user, level, exp }) => {
  const defaultAvatar = '../../../assets/profilePics/fallback.png';
  const maxExp = getMaxExp(level);
  
  return (
  <section className="profileCard">
    <Link to="/pages/settings/pic" className="profileLink">
      <div className="imageWrapper">
        <img loading="lazy" src={user.avatar || defaultAvatar} alt={user.alt || 'Avatar'} className="profileImage" />
      </div>
      <div className="profileInfo">
        <div className="profileDetails">
          <div className="username">{user.username}</div>
          <div className="level">
            <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/a42ab00f590f40beebc8c5439ddd4e96b62d4b19b253884f74de27c8c10d5392?apiKey=c783704b74984f0dbdfec1a20a08ce36&" alt="Level Icon" className="LevelIcon" />
            <div className="levelText">Level {level}</div>
          </div>
          <div className="exp">{exp}/{maxExp}</div>
          <div className="expValue">EXP</div>
          <div className="progressBarContainer">
            <div className="progressBar" style={{ width: `${(exp / maxExp) * 100}%` }} />
          </div>
        </div>
      </div>
    </Link>
  </section>
  )
};

export default ProfileCard;