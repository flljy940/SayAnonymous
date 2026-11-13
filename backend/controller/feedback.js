const pool = require('../db');
const { text } = require('../lib/validation');
async function submitFeedback(req, res, next) {
  const { feedback, rating = null, type = 'general' } = req.body;
  if (!text(feedback, 1000) || !text(type, 30) || (rating !== null && (!Number.isInteger(rating) || rating < 1 || rating > 5))) return res.status(400).json({ message: 'Enter feedback of 1–1,000 characters and an optional rating from 1–5.' });
  try {
    await pool.execute('INSERT INTO feedback (user_id, feedback_text, rating, type) VALUES (?, ?, ?, ?)', [req.user.id, feedback.trim(), rating, type]);
    res.status(201).json({ message: 'Thanks for your feedback.' });
  } catch (error) { next(error); }
}
async function getFeedback(req, res, next) {
  try {
    const [rows] = await pool.execute('SELECT id, feedback_text, rating, type, timestamp FROM feedback WHERE user_id = ? ORDER BY id DESC LIMIT 50', [req.user.id]);
    res.json(rows);
  } catch (error) { next(error); }
}
module.exports = { submitFeedback, getFeedback };
