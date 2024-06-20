const bcrypt = require('bcryptjs');
const pool = require('../db');
const axios = require('axios');

const login =  async (req, res) => {
    const { email, password } = req.body;
    const selectQuery = 'SELECT * FROM users WHERE email = ?';
    const updateQuery = 'UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ?';
    
    try {
      const [results] = await pool.execute(selectQuery, [email]);
      if (results.length > 0) {
        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
          await pool.execute(updateQuery, [user.id]);
          res.json({ message: 'Login successful' });
        } else {
          res.status(401).send('Invalid email or password');
        }
      } else {
        res.status(401).send('Invalid email or password');
      }
    } catch (err) {
      console.error('Error during login:', err);
      res.status(500).send('Server error');
    }
  };
  
  const register = async (req, res) => {
    const { email, password, username } = req.body;
    const selectQuery = 'SELECT * FROM users WHERE email = ?';
    const insertQuery = 'INSERT INTO users (email, password, username) VALUES (?, ?, ?)';
    
    try {
      const [results] = await pool.execute(selectQuery, [email]);
      if (results.length > 0) {
        res.status(409).send('Account already exists');
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        await pool.execute(insertQuery, [email, hashedPassword, username]);
        res.status(201).json({ message: 'Registration successful' });
      }
    } catch (err) {
      console.error('Error during registration:', err);
      res.status(500).send('Server error');
    }
  };

  module.exports = { login, register };
