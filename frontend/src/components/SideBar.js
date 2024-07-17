// SideBar.js
import React, { useContext } from 'react';
import './SideBar.css';
import SideItem from './SideItem'; // Adjust the path if needed
import { SidebarContext } from './SidebarContext';

const SideBar = () => {
  const { activeItem } = useContext(SidebarContext);

  const sideItems = [
    { picName: 'home', name: 'Home', path: '/pages/home/top' },
    // { picName: 'notifications', name: 'Notifications', path: '/pages/notifications' },
    { picName: 'home', name: 'Saved Posts', path: '/pages/savedposts' },
    { picName: 'settings', name: 'Settings', path: '/pages/settings/base' },
  ];

  return (
    <div className='leftbar'>
      <div className="leftsideitem">
        <span className='sidename'>SayAnonymous</span>
        {sideItems.map(item => (
          <SideItem
            key={item.name}
            picName={item.picName}
            name={item.name}
            path={item.path}
            clicked={activeItem === item.name ? 'y' : 'n'}
          />
        ))}
      </div>
    </div>
  );
};

export default SideBar;
