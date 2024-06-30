import React, { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import SideBar from '../../components/SideBar';
import Tabs from '../../components/Tabs';
import './Home.css';

const Home = () => {
  const homeTabs = [
    { label: 'Top', path: 'top' },
    { label: 'New', path: 'new' },
  ];

  return (
    <nav className="container">
      {/* Sidebar */}
        <SideBar />


      {/* tabs for home page */}
      <Tabs tabs={homeTabs} />
        
      <Outlet />
    </nav>
  );
};

export default Home;
