const pool = require('../db');

const submitFeedback = async (req, res) => {
  const { content } = req.body;
  const userId = req.user.id;
  console.log('User ID:', userId);
  try {
    const query = 'INSERT INTO feedback (user_id, feedback_text) VALUES (?, ?)';
    await pool.execute(query, [userId, content]);
    res.status(201).json({ message: 'Feedback submitted successfully' });
  } catch (error) {
    console.error('Error submitting feedback:', error);
    res.status(500).json({ message: 'Failed to submit feedback' });
  }
};

const getFeedback = async (req, res) => {
  try {
    const [feedback] = await pool.execute('SELECT * FROM feedback ORDER BY timestamp DESC');
    res.status(201).json(feedback);
  } catch (error) {
    console.error('Error getting feedback:', error);
    res.status(500).json({ message: 'Failed to get feedback' });
  }
};

module.exports = { submitFeedback, getFeedback };
