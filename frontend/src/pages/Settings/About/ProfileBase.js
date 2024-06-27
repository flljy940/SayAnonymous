import * as React from "react";
import { Link, Outlet } from "react-router-dom";
import './Profile.css';
import SideItem from "../../../components/SideItem";
import ProfileCard from "./ProfileCard";
import FollowingBox from "./FollowBox";

function ProfileBase() {
  
  return (

      <div className="content-container">
        <title>SayAnonymous</title>

      <nav className="main-content">

        {/* boxes */}
        <div className="boxContainer">
          <div className="column1">
            <span className="profilePos">
              <ProfileCard 
                user={{ username: 'mee', avatar: require('../../../assets/profilePics/profile3.png') }}
                 username="myNickName" level='1' exp='33/50' />
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

export default ProfileBase;

