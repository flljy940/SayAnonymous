import React from "react";
import './Statistics.css';

const actionData = [
  { action: "Create a Post", exp: "10" },
  { action: "Comment on A Post", exp: "5" },
  { action: "Report inappropriate content", exp: "5" },
  { action: "Receive a Like or Comment on a Post", exp: "2" },
];

function ExperienceTable() {
  return (
    <div>
      <div className="expRow">
        <div className="rowTitle">Action</div>
        <div className="rowTitle">EXP</div>
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

const levelRule = [
  { level: "1", exp: "100" },
  { level: "2", exp: "300" },
  { level: "3", exp: "800" },
  { level: "4", exp: "1500" },
  { level: "5", exp: "2400" },
  { level: "6", exp: "4000" },
];

function LevelRef() {
  return (
    <div>
      <div className="expRow">
        <div className="rowTitle">Level</div>
        <div className="rowTitle">EXP required</div>
      </div>
      {levelRule.map((item, index) => (
        <div key={index} className="expRow">
          <div>{item.level}</div>
          <div>{item.exp}</div>
        </div>
      ))}
    </div>
  );
}

function Statistics() {
  return (
    <div className="container">
      <div className="header">Statistics</div>
      <div className="boxContainer">
        <div className="column1">
          <LevelRef />
        </div>
        <div className="column2">
          <div className="ruleTitle">How do I get EXP?</div>
          <div className="explain">
            When you register on SayAnonymous, you are immediately a level 1 user. As you continue to be active in the app, you earn more EXP. The amount of EXP that you earn depends on:
          </div>
          <ExperienceTable />
          <div className="explain">
            You also earn EXP for maintaining a login streak with 1 additional EXP daily, up to 10 EXP per day.
          </div>
        </div>
      </div>
    </div>
  );
}

export default Statistics;

