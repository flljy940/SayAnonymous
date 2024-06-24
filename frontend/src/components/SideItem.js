// SideItem.js
import React from 'react';
import './SideItem.css';
import { Link } from 'react-router-dom';

const SideItem = ({ picName, name, path, clicked }) => {
  if (clicked === "y") {
    return (
      <div className="clickedItem">
        <div className='clickContent'>
        <img src={picName} alt={name} className="side-item-img" />

          <Link to={path} className="toClick">
            <span className="side-item-text">
            {name}
            </span>
          </Link>
          </div>
      </div>
    );
  } else {
    return (
      <div className="side-item">
        <img src={picName} alt={name} className="side-item-img" />
        <span className="side-item-text">
          <Link to={path} className="toClick">
            {name}
          </Link>
        </span>
      </div>
    );
  }
}

export default SideItem;

