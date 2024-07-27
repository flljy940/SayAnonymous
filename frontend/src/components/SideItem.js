// SideItem.js
import React, { useContext } from 'react';
import './SideItem.css';
import { Link } from 'react-router-dom';
import { SidebarContext } from './SidebarContext';
import home from '../assets/sideItemPics/home.png';
import saved from '../assets/sideItemPics/saved.png';
import settings from '../assets/sideItemPics/settings.png';

const SideItem = ({ picName, name, path, clicked }) => {
  const { setActiveItem } = useContext(SidebarContext);

  const handleClick = () => {
    setActiveItem(name);
  };

  const icons = {
    home,
    saved,
    settings,
  };

  return (
    <div className={clicked === 'y' ? 'clickedItem' : 'side-item'} onClick={handleClick}>
      <Link to={path} className="toClick">
      <div className='clickContent'>
        <img src={icons[picName]} alt={name} className="side-item-img" />
        
          <span className="side-item-text">
            {name}
          </span>
        
      </div>
      </Link>
    </div>
  );
};

export default SideItem;
