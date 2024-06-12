// SideItem.js
import React from 'react';
import './SideItem.css';

const SideItem = ({ file, name }) => {
  return (
    <div className="side-item">
      <img src={file} alt={name} className="side-item-img" />
      <span className="side-item-text">{name}</span>
    </div>
  );
}

export default SideItem;

