const pool = require('../db');

const createUser = async (email, password, username) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.execute('INSERT INTO users (email, password, username) VALUES (?, ?, ?)', [email, hashedPassword, username]);
};

const getUserByEmail = async (email) => {
    const [users] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
    return users[0];
};

const getUserProfile = async (userId) => {
    const [profiles] = await pool.execute('SELECT * FROM users WHERE id = ?', [userId]);
    return profiles[0];
};

const updateUserProfile = async (userId, pseudonym, avatar, description) => {
    await pool.execute('UPDATE users SET pseudonym = ?, avatar = ?, description = ? WHERE id = ?', [pseudonym, avatar, description, userId]);
};

module.exports = { createUser, getUserByEmail, getUserProfile, updateUserProfile };
