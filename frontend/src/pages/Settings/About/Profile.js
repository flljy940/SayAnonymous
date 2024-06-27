import * as React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import './Profile.css';
import SideBar from "../../../components/SideBar";
import Tabs from "../../../components/Tabs";

function Profile() {
  const location = useLocation();
  const isSettings = location.pathname.includes('settings');

  const profileTabs = [
    { label: 'My Posts', path: 'myposts' },
    { label: 'About', path: '/pages/settings/base' }
  ];
  return (

      <div className="container">
        <title>SayAnonymous</title>

      {/* Sidebar */}
      <div>
        <SideBar />
      </div>

      <nav>
        {/* tabs */}
        <Tabs tabs={profileTabs} />

      </nav>
      <Outlet />
    </div>

  );
}

export default Profile;

