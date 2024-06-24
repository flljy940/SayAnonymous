import React from 'react';
import { Link } from 'react-router-dom';
import './Card.css';

const FollowingBox = () => (
  <section className="profileCard">
    <Link to="/pages/settings/following" className="profileLink">
      
      <div className="profileInfo">
        <div className="profileDetails">
          <div>My Following      {'>>'}</div>
        </div>
      </div>
    </Link>
  </section>
);

export default FollowingBox;