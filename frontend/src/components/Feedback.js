// src/components/Feedback.js
import React from 'react';
import './Feedback.css';

const Feedback = () => {
  return (
    <div className="feedback-container">
      <div className="feedback-header">
        <button className="feedback-button">Post</button>
        <button className="feedback-button">Image & Video</button>
        <button className="feedback-button">Link</button>
      </div>
      <div className="feedback-body">
        <textarea className="feedback-input" placeholder="Write down your feedback"></textarea>
      </div>
      <div className="feedback-footer">
        <button className="submit-button">Submit</button>
      </div>
      <div className="feedback-emojis">
        <span className="emoji">😡</span>
        <span className="emoji">😕</span>
        <span className="emoji">😊</span>
        <span className="emoji">😄</span>
        <span className="emoji">😍</span>
        <p>We appreciate your feedback!</p>
      </div>
      <div className="feedback-rating">
        <p>Rate our app</p>
      </div>
    </div>
  );
}

export default Feedback;
