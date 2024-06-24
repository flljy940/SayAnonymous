import * as React from "react";
import { Link } from "react-router-dom";
import './Statistics.css';
import SideItem from "../../../components/SideItem";

const actionData = [
    { action: "Create a Post", exp: "10" },
    { action: "Comment on A Post", exp: "5" },
    { action: "Receive a Like or Comment on a Post", exp: "2" },
    { action: "Participate in a Community", exp: "2 per message" },
    { action: "Report inappropriate content", exp: "3" },
    { action: "...", exp: "..." },
    { action: "...", exp: "..." },
  ];

  

  function ExperienceTable() {
    return (
      <div>
        <div className="expRow">
          <div>Action</div>
          <div>EXP</div>
        </div>
        {actionData.map((item, index) => (
          <div key={index} className="expRow">
            <div>{item.action}</div>
            <div>{item.exp}</div>
          </div>
        ))}
      </div>
    );
  }

function Statistics() {
    return (
        <div className="boxContainer">
          <div className="column1">
            <span className="profilePos">
              Statistics
            </span>
            <div className="followingPos">
                <div>Level 1</div>
                <div className="levelRule">
                    <div>Level</div>
                    <div>Available Actions</div>
                    <div>EXP</div>
                </div>
            </div>
          </div>

          <div className="column2">
            <div>How do I get EXP?</div>
            <div className="explain">When you register on SayAnonymous, you are immediately the level 1 user. As you continue to be active in the app, you earn more EXP. The amount of the EXP that you earn depends on:</div>
            <ExperienceTable />
            <div className="explain">You also earn EXP for maintaining a login streak, where a streak of 1 day grants you 1 point, 2 days grant you 2 points, and so on, with an upper limit of 10 points.</div>
          </div>
        </div>
    );

}

export default Statistics;