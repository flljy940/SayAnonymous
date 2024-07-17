import React, { useEffect, useState } from 'react';

const FeedbackList = () => {
    const [feedbackList, setFeedbackList] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFeedback = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/feedback');
                if (response.ok) {
                    const data = await response.json();
                    setFeedbackList(data);
                } else {
                    const errorData = await response.json();
                    setError(`Failed to fetch feedback: ${errorData.message}`);
                }
            } catch (error) {
                console.error('Error:', error);
                setError('Failed to fetch feedback');
            }
        };

        fetchFeedback();
    }, []);

    return (
        <div className="feedback-list">
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {feedbackList.map(item => (
                <div key={item.id} className="feedback-item">
                    <p>{item.feedback_text}</p>
                    {item.image_url && <img src={item.image_url} alt="Feedback" className="feedback-image" />}
                </div>
            ))}
        </div>
    );
};

export default FeedbackList;
