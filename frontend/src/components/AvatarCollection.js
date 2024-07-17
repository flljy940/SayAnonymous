import React from 'react';
import './AvatarCollection.css';

const AvatarCollection = ({ avatars, onSelectAvatar, selectedAvatar }) => {
  return (
    <div className="avatar-collection">
      {avatars.map((avatar) => (
        <div
          key={avatar.id}
          className={`avatar-item ${selectedAvatar && selectedAvatar.id === avatar.id ? 'selected' : ''}`}
          onClick={() => onSelectAvatar(avatar)}
        >
          <img src={avatar.url} alt={`Avatar ${avatar.id}`} />
          <button className='play-button' onClick={() => onSelectAvatar(avatar)}>
            {selectedAvatar && selectedAvatar.id === avatar.id ? '✔' : '▶'}
          </button>
        </div>
      ))}
    </div>
  );
};

export default AvatarCollection;
