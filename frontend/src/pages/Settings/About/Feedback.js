import React, { useState } from 'react';
import Feedback from '../components/Feedback';
import './Feedback.css'; // Add any additional styling if necessary

const Feedback = () => {
    const [feedback, setFeedback] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        console.log('Form submitted');

        const token = localStorage.getItem('token');

        if (!token) {
            alert('Please log in to submit feedback');
            return;
        }

        try {
            const response = await fetch (`/api/feedback`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ feedback }),
            });

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
        } finally {
            setSubmitting(false);
        }
    };

  return (
    <form onSubmit={handleSubmit}>
        <div>
            <label>Write down your feedback</label>
            <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                required
            ></textarea>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
        
        <button type="submit" disabled={submitting}>Submit</button>
        {success && <p style={{ color: 'green' }}>{success}</p>}
    </form>
    
  );
}

export default Feedback;
