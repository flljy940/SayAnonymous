const pool = require('../db');

const submitFeedback = async (req, res) => {
  const { content } = req.body;
  const userId = req.userId;
  try {
    const query = 'INSERT INTO feedback (user_id, content) VALUES (?, ?)';
    await pool.execute(query, [userId, content]);
    res.status(201).json({ message: 'Feedback submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to submit feedback' });
  }
};

const getFeedback = async (req, res) => {
  try {
    const [feedback] = await pool.execute('SELECT * FROM feedback ORDER BY created_at DESC');
    res.json(feedback);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get feedback' });
  }
};

module.exports = { submitFeedback, getFeedback };
