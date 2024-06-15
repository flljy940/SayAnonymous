const connection = require('../db');

const expActivities = {
  createPost: 10,
  comment: 5,
  like: 2,
  reportContent: 3,
};

const addExp = async (userId, activity) => {
  const exp = expActivities[activity] || 0;
  const updateExpQuery = 'UPDATE users SET exp = exp + ? WHERE id = ?';

  try {
    await connection.execute(updateExpQuery, [exp, userId]);
  } catch (error) {
    console.error('Error updating EXP:', error);
  }
};

const checkLevelUp = async (userId) => {
  const getUserExpQuery = 'SELECT exp FROM users WHERE id = ?';
  const [rows] = await connection.execute(getUserExpQuery, [userId]);
  const exp = rows[0].exp;

  let level = 1;
  if (exp >= 50 && exp < 100) level = 2;
  else if (exp >= 100 && exp < 200) level = 3;
  else if (exp >= 200 && exp < 500) level = 4;
  else if (exp >= 500 && exp < 1000) level = 5;
  else if (exp >= 1000) level = 6;

  const updateLevelQuery = 'UPDATE users SET level = ? WHERE id = ?';
  await connection.execute(updateLevelQuery, [level, userId]);
};

const recordActivity = async (req, res) => {
  const { userId, activity } = req.body;

  try {
    await addExp(userId, activity);
    await checkLevelUp(userId);
    res.send('Activity recorded');
  } catch (err) {
    res.status(500).send('Server error');
  }
};

module.exports = { recordActivity };
