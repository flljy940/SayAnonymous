const pool = require('../db');
const rewards = { createPost: 10, comment: 5 };
async function recordActivity(userId, activity) {
  await pool.execute('UPDATE users SET exp = exp + ? WHERE id = ?', [rewards[activity] || 0, userId]);
  await pool.execute('UPDATE users SET level = 1 + CAST(exp / 50 AS INTEGER) WHERE id = ?', [userId]);
}
module.exports = { recordActivity };
