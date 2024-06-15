const connection = require('../db');

const generatePseudonym = () => {
  const pseudonyms = ['OrangeFox', 'RedMonster', 'GreenMonster', 'PinkMonster', 'PurpleMonster', 'FriendsKawaii'];
  return pseudonyms[Math.floor(Math.random() * pseudonyms.length)];
};

const setupProfile = async (req, res) => {
  const { userId, pseudonym, avatar, description } = req.body;
  const finalPseudonym = pseudonym || generatePseudonym();
  
  const query = 'UPDATE users SET pseudonym = ?, avatar = ?, description = ? WHERE id = ?';
  
  try {
    await connection.execute(query, [finalPseudonym, avatar, description, userId]);
    res.send('Profile setup complete');
  } catch (err) {
    res.status(500).send('Server error');
  }
};

const getProfile = async (req, res) => {
  const { userId } = req.params;
  const query = 'SELECT exp, level FROM users WHERE id = ?';

  try {
    const [rows] = await connection.execute(query, [userId]);
    const user = rows[0];
    res.json({
      exp: user.exp,
      level: user.level,
      progress: user.exp % 50, // assuming each level needs 50 EXP
    });
  } catch (err) {
    res.status(500).send('Server error');
  }
};

const getRewards = (level) => {
  switch (level) {
    case 2:
      return { access: 'Basic', limit: 10 };
    case 3:
      return { access: 'Intermediate', limit: 20 };
    case 4:
      return { access: 'Advanced', limit: 30 };
    case 5:
      return { access: 'Moderator', limit: 40 };
    case 6:
      return { access: 'Admin', limit: 50 };
    default:
      return { access: 'Newbie', limit: 5 };
  }
};

const getUserRewards = async (req, res) => {
  const { userId } = req.params;
  const query = 'SELECT level FROM users WHERE id = ?';

  try {
    const [rows] = await connection.execute(query, [userId]);
    const level = rows[0].level;
    const rewards = getRewards(level);
    res.json(rewards);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

module.exports = { setupProfile, getProfile, getUserRewards };
