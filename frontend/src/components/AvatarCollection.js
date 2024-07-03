import React from 'react';
import './AvatarCollection.css';

const AvatarCollection = ({ avatars, onSelectAvatar }) => {
  return (
    <div className="avatar-collection">
      {avatars.map((avatar, index) => (
        <img
          key={index}
          src={avatar.url}
          alt={`Avatar ${index + 1}`}
          className="avatar-item"
          onClick={() => onSelectAvatar(avatar)}
        />
      ))}
    </div>
  );
};

export default AvatarCollection;
