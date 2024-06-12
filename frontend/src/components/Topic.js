import React from 'react';
import './Topic.css';

const Topic = ({ topic }) => {
  return (
    <div className="suggested-topic">
      <div>{topic.name}</div>
      <div className="suggested-members">{topic.members} members</div>
    </div>
  );
}

export default Topic;

