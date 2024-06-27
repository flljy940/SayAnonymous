import React from 'react';
import { Link } from 'react-router-dom';
import './Card.css';

const ProfileCard = ({ user, level, exp, maxExp }) => (
  <section className="profileCard">
    <Link to="/pages/settings/pic" className="profileLink">
      <div className="imageWrapper">
        <img loading="lazy" src={user.avatar} alt={user.alt} className="profileImage" />
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
);

export default ProfileCard;