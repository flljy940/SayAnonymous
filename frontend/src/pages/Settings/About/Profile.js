import * as React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import './Profile.css';
import SideItem from "../../../components/SideItem";
import ProfileCard from "./ProfileCard";
import FollowingBox from "./FollowBox";
import ProfileBase from "./ProfileBase";

function Profile() {
  const location = useLocation();
  const isSettings = location.pathname.includes('settings');
  
  return (

      <div className="container">
        <title>SayAnonymous</title>

      {/* Sidebar */}
      <div className='leftbar'>
        <div className="leftsidebar"></div>
        <div className="leftsideitem">
          <span className='sidename'>SayAnonymous</span>
          <SideItem picName="home" name="Home" path="/pages/home/*" clicked="n" />
          <SideItem picName="notifications" name="Notifications" path="/pages/home/*" clicked="n" />
          <SideItem picName="home" name="Saved" path="/pages/savedposts" clicked="n" />
          <SideItem picName="settings" name="Settings" path="/pages/settings/*" clicked="y" />
        </div>
      </div>

      <nav className="main-content">
        {/* tabs */}
        <div className="tabs">
          <span className="tab">
            <Link to="/pages/settings/*" className="toClick">
              My Posts
            </Link>
          </span>
          <span className="active-tab">
            <Link to="/pages/settings/*" className="clicked">
              About
            </Link>
          </span>
        </div>

        
        {/* boxes */}
        <div className="boxContainer">
          <div className="column1">
            <span className="profilePos">
              <ProfileCard src="" alt="profile1" username="myNickName" level='1' exp='33/50' />
            </span>
          </div>

          <div className="column2">
            <div>
              <Link to="/pages/settings/stats" className="toClick">
                Exp rules
              </Link>
            </div>
          </div>
        </div>

      </nav>
      <Outlet />
    </div>

  );
}

export default Profile;

