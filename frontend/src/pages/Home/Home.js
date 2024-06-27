import React, { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import SideBar from '../../components/SideBar';
import Tabs from '../../components/Tabs';
import './Home.css';

const Home = () => {
  const homeTabs = [
    { label: 'Top', path: 'top' },
    { label: 'New', path: 'new' },
    { label: 'Majors', path: 'major' }
  ];

  return (
    <nav className="container">
      {/* Sidebar */}
        <SideBar />


      {/* tabs for home page */}
        <div className="tabs">
          <Tabs tabs={homeTabs} />
        </div>
        
      <Outlet />
    </nav>
  );
};

export default Home;
