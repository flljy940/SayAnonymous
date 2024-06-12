// SuggestedPerson.js
import React from 'react';
import './Person.css';

const Person = ({ user }) => {
  return (
    <div className="suggested-person">
      <img src={user.avatar} alt={user.name} className="suggested-avatar" />
      <div>
        <div className="suggested-name">{user.name}</div>
        <div className="suggested-username">@{user.username}</div>
      </div>
    </div>
  );
}

export default Person;
