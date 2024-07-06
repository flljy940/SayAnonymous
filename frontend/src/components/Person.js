// SuggestedPerson.js
import React from 'react';
import './Person.css';

const Person = ({ user }) => {
  return (
    <div className="suggested-person">
      {Array.isArray(user) && user.length > 0 ? (
        user.map(u => (
          <div key={u.id}>
            <img src={u.avatar} alt={u.name} className="suggested-avatar" />
            <div>
              <div className="suggested-name">{u.name}</div>
              <div className="suggested-username">@{u.username}</div>
            </div>
          </div>
        ))
      ) : (
        <div>No suggested people available</div>
      )}
    </div>
  );
}

export default Person;
