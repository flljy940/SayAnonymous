const pool = require('../db');

const generatePseudonym = () => {
  const pseudonyms = ['OrangeFox', 'RedMonster', 'GreenMonster', 'PinkMonster', 'PurpleMonster', 'FriendsKawaii'];
  return pseudonyms[Math.floor(Math.random() * pseudonyms.length)];
};

const setupProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const { pseudonym, avatar, description } = req.body;
    const finalPseudonym = pseudonym || generatePseudonym();
    const finalAvatar = avatar || '';
    const finalDescription = description || '';
    
    const query = 'UPDATE users SET pseudonym = ?, avatar = ?, description = ? WHERE id = ?';
  
    await pool.execute(query, [finalPseudonym, finalAvatar, finalDescription, userId]);
    res.status(201).json({ message: 'Profile setup complete' });
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      return res.status(401).send('Invalid token');
    }
    console.error('Error setting up profile:', err);
    res.status(500).json({ message: 'Failed to setup profile' });
  }
};

const getProfile = async (req, res) => {
  const { userId } = req.params;
  const query = 'SELECT * FROM users WHERE id = ?';

  try {
    const [rows] = await pool.execute(query, [userId]);
    if (rows.length > 0) {
      const user = rows[0];
      res.json({
        username: user.username,
        pseudonym: user.pseudonym,
        avatar: user.avatar,
        description: user.description,
        exp: user.exp,
        level: user.level,
        progress: user.exp % 50, // assuming each level needs 50 EXP
      });
    } else {
      res.status(404).json({ message: 'Profile not found' });
    }
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Failed to fetch profile' });
  }
};

const deleteUser = async (req, res) => {
  const { userId } = req.params;
  const query = 'DELETE FROM users WHERE id = ?';

  try {
    await pool.execute(query, [userId]);
    res.json({ message: 'Profile deleted successfully' });
  } catch (err) {
    console.error('Error deleting profile', err);
    res.status(500).json({ message: 'Failed to delete profile' });
  }
}

/*
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
  const query = 'SELECT * FROM rewards WHERE user_id = ?';

  try {
    const [rows] = await pool.execute(query, [userId]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    const level = rows[0].level;
    const rewards = getRewards(level);
    res.json(rewards);
  } catch (err) {
    console.error('Error fetching user rewards:', error);
    res.status(500).json({ message: 'Failed to fetch user rewards' });
  }
};

// Example of rewards
// Posting Limit
// Level 1 (Newbie): 5 posts per day
// Level 2 (Basic): 10 posts per day
// Level 3 (Intermediate): 20 posts per day
// Level 4 (Advanced): 30 posts per day
// Level 5 (Moderator): 40 posts per day
// Level 6 (Admin): 50 posts per day
// OR
// Content Access Limit
// Level 1 (Newbie): Access to 5 articles per week
// Level 2 (Basic): Access to 10 articles per week
// Level 3 (Intermediate): Access to 20 articles per week
// Level 4 (Advanced): Access to 30 articles per week
// Level 5 (Moderator): Access to 40 articles per week
// Level 6 (Admin): Access to 50 articles per week
*/

module.exports = { setupProfile, getProfile, deleteUser };
