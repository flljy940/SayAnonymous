import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Tabs.css';

const Tabs = ({ tabs }) => {
  const location = useLocation();

  return (
    <div className="tabs">
      {tabs.map((tab, index) => {
        const isActive = location.pathname.includes(tab.path);
        return (
          <span key={index} className={isActive ? "active-tab" : "tab"}>
            <Link to={tab.path} className={isActive ? "clicked" : "toClick"}>
              {tab.label}
            </Link>
          </span>
        );
      })}
    </div>
  );
};

export default Tabs;
