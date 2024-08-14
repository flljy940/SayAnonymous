// SuggestedPerson.js
import React from 'react';
import './Person.css';

import profile1 from '../assets/profilePics/profile1.png';
import profile2 from '../assets/profilePics/profile2.png';
import profile3 from '../assets/profilePics/profile3.png';
import profile4 from '../assets/profilePics/profile4.png';
import profile5 from '../assets/profilePics/profile5.png';
import profile6 from '../assets/profilePics/profile6.png';
import fallback from '../assets/profilePics/fallback.png';

const avatarMap = {
  1: profile1,
  2: profile2,
  3: profile3,
  4: profile4,
  5: profile5,
  6: profile6,
};

const Person = ({ user }) => {
  console.log('Person user:', user);
  
  return (
    <div className="suggested-person">
            <img src={avatarMap[user.avatar] || fallback} alt={user.name} className="suggested-avatar" />
            <div>
              <div className="suggested-name">{user.name}</div>
              <div className="suggested-username">@{user.username}</div>
            </div>
          </div>
  );
};

export default Person;
