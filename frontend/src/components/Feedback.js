// src/components/Feedback.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Feedback.css';

const Feedback = () => {
    const [feedback, setFeedback] = useState('');
    const [rating, setRating] = useState(null);
    const [type, setType] = useState('post');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const token = localStorage.getItem('token');

        if (!token) {
            alert('Please log in to submit feedback');
            setLoading(false);
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
                body: JSON.stringify({ feedback, type, rating }),
            });

            if (response.ok) {
                const data = await response.json();
                setSuccess(data.message);
                setFeedback('');
                setRating(null); 
                setError(null);

                setTimeout(() => {
                  navigate('/pages/settings/base');
                }, 2000);
            } else {
                const errorData = await response.json();
                setError(`Failed to submit feedback: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Failed to submit feedback');
        } finally {
          setLoading(false);
        }
    };

    const handleEmojiClick = (ratingValue) => {
      setRating(ratingValue);
    }

  return (
    <div className="feedback-container">
      <form onSubmit={handleSubmit}>
        <div className="feedback-header">
          <button className={`feedback-button ${type === 'post' ? 'active' : ''}`} type='button' onClick={() => setType('post')}>Text</button>
          <button className={`feedback-button ${type === 'rate' ? 'active' : ''}`} type ='button' onClick={() => setType('rate')}>Rating</button>
        </div>
        <div className="feedback-body">
          {type === 'post' && (
            <textarea 
            className="feedback-input" 
            placeholder="Write down your feedback" 
            value={feedback} 
            onChange={(e) => setFeedback(e.target.value)} 
            required
            ></textarea>
          )}
          {type === 'rate' && (
            <div className="feedback-emojis">
            <span className={`emoji ${rating === 1 ? 'selected' : ''}`} onClick={() => handleEmojiClick(1)}>😡</span>
            <span className={`emoji ${rating === 2 ? 'selected' : ''}`} onClick={() => handleEmojiClick(2)}>😕</span>
            <span className={`emoji ${rating === 3 ? 'selected' : ''}`} onClick={() => handleEmojiClick(3)}>😊</span>
            <span className={`emoji ${rating === 4 ? 'selected' : ''}`} onClick={() => handleEmojiClick(4)}>😄</span>
            <span className={`emoji ${rating === 5 ? 'selected' : ''}`} onClick={() => handleEmojiClick(5)}>😍</span>
            </div>
          )}
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
        <div className="feedback-footer">
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
      
      <div className="feedback-rating">
        <p>We appreciate your feedback!</p>
      </div>

      {error && <div className='error'>{error}</div>}
      {success && <div className='success'>{success}</div>}
    </div>
  );
}

export default Feedback;
