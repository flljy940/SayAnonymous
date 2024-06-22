const pool = require('../db');

const expActivities = {
  createPost: 10,
  comment: 5,
  receiveLikeOrComment: 2,
  reportContent: 3,
};

const expForConsecutiveLogins = (daysInARow) => {
  return daysInARow;
}

const addExp = async (userId, activity) => {
  const exp = expActivities[activity] || 0;
  const updateExpQuery = 'UPDATE users SET exp = exp + ? WHERE id = ?';
  console.log('EXP:', exp);
  try {
    await pool.execute(updateExpQuery, [exp, userId]);
  } catch (error) {
    console.error('Error updating EXP:', error);
  }
};

const updateExpForConsecutiveLogins = async (userId) => {
  const getUserQuery = 'SELECT last_login, exp, consecutive_logins FROM users WHERE id = ?';
  const [rows] = await pool.execute(getUserQuery, [userId]);
  const user = rows[0];

  const today = new Date();
  const lastLogin = new Date(user.last_login);
  const diffTime = Math.abs(today - lastLogin);
  const diffDays = Math.ceil(diffTime / (1000*60*60*24));

  if (diffDays === 1) {
    const daysInARow = user.consecutive_logins + 1;
    const expToAdd = expForConsecutiveLogins(daysInARow);
    const updateExpQuery = 'UPDATE users SET exp = ?, consecutive_logins = ? WHERE id = ?';
    await pool.execute(updateExpQuery, [user.exp + expToAdd, daysInARow, userId]);
  } else if (diffDays > 1) {
    const updateExpQuery = 'UPDATE users SET exp = ?, consecutive_logins = ? WHERE id = ?';
    await pool.execute(updateExpQuery, [user.exp, 1, userId]);
  }
};

const checkLevelUp = async (userId) => {
  const getUserExpQuery = 'SELECT exp FROM users WHERE id = ?';
  const [rows] = await pool.execute(getUserExpQuery, [userId]);
  const exp = rows[0].exp;

  let level = 1;
  if (exp >= 50 && exp < 100) level = 2;
  else if (exp >= 100 && exp < 200) level = 3;
  else if (exp >= 200 && exp < 500) level = 4;
  else if (exp >= 500 && exp < 1000) level = 5;
  else if (exp >= 1000) level = 6;

  const updateLevelQuery = 'UPDATE users SET level = ? WHERE id = ?';
  await pool.execute(updateLevelQuery, [level, userId]);
};

const recordActivity = async (userId, activity) => {
  try {
    await addExp(userId, activity);
    await updateExpForConsecutiveLogins(userId);
    await checkLevelUp(userId);
    console.log('Activity recorded:', activity);
  } catch (err) {
    console.error('Error recording activity:', error);
  }
};

module.exports = { recordActivity };
