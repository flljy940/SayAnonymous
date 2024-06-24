import * as React from "react";
import { Link, Outlet } from "react-router-dom";
import './Profile.css';
import SideItem from "../../../components/SideItem";
import ProfileCard from "./ProfileCard";
import FollowingBox from "./FollowBox";

function ProfileBase() {
  
  return (

      <div className="container">
        <title>SayAnonymous</title>

      <nav className="main-content">

        {/* boxes */}
        <div className="boxContainer">
          <div className="column1">
            <span className="profilePos">
              <ProfileCard src="" alt="profile1" username="myNickName" level='1' exp='33/50' />
            </span>
            <span className="followingPos">
              <FollowingBox />
            </span>
          </div>

          <div className="column2">
            <Link to="/pages/settings/stats" className="toClick">
              Exp rules
            </Link>
          </div>
        </div>

      </nav>
      <Outlet />
    </div>

  );
}

export default ProfileBase;

