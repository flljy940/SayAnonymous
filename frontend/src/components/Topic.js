import React from 'react';
import './Topic.css';

const Topic = ({ topic = [] }) => {
  return (
    <div className="suggested-topic">
      {Array.isArray(topic) && topic.length > 0 ? (
        topic.map(t => (
          <div key={t.id} className='topic-item'>
            <div className='topic-name'>{t.name}</div>
            <div className="suggested-members">{t.members} members</div>
          </div>
        ))
      ) : (
        <div>No topics available</div>
      )}
    </div>
  );
};

export default Topic;

