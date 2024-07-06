// src/components/Feedback.js
import React, { useState } from 'react';
import './Feedback.css';

const Feedback = () => {
    const [feedback, setFeedback] = useState('');
    const [type, setType] = useState('post');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form submitted');

        const token = localStorage.getItem('token');

        if (!token) {
            alert('Please log in to submit feedback');
            return;
        }

        console.log('Token:', token);

        try {
            const response = await fetch (`http://localhost:5000/api/feedback`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ feedback, type }),
            });

            console.log('Response status:', response.status);

            if (response.ok) {
                const data = await response.json();
                console.log('Server response:', data);
                setSuccess(data.message);
                setFeedback('');
                setError(null);
            } else {
                const errorData = await response.json();
                setError(`Failed to submit feedback: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Failed to submit feedback');
        } 
    };

  return (
    <div className="feedback-container">
      <form onSubmit={handleSubmit}>
        <div className="feedback-header">
          <button className="feedback-button" type='button' onClick={() => setType('post')}>Post</button>
          <button className="feedback-button" type='button' onClick={() => setType('imgae')}>Image & Video</button>
          <button className="feedback-button" type='button' onClick={() => setType('link')}>Link</button>
        </div>
        <div className="feedback-body">
          <textarea 
              className="feedback-input" 
              placeholder="Write down your feedback" 
              value={feedback} 
              onChange={(e) => setFeedback(e.target.value)} 
              required
          ></textarea>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
        <div className="feedback-footer">
          <button type="submit" className="submit-button">Submit</button>
        </div>
      </form>
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
