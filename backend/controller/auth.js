const bcrypt = require('bcryptjs');
const connection = require('../db');
const axios = require('axios');

const login =  async (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT * FROM users WHERE email = ?';
    
    try {
      const [results] = await connection.execute(query, [email]);
      if (results.length > 0) {
        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
          res.send('Login successful');
        } else {
          res.status(401).send('Invalid email or password');
        }
      } else {
        res.status(401).send('Invalid email or password');
      }
    } catch (err) {
      res.status(500).send('Server error');
    }
  };
  
  const register = async (req, res) => {
    const { email, password, username } = req.body;
    const selectQuery = 'SELECT * FROM users WHERE email = ?';
    const insertQuery = 'INSERT INTO users (email, password, username) VALUES (?, ?, ?)';
    
    try {
      const [results] = await connection.execute(selectQuery, [email]);
      if (results.length > 0) {
        res.status(409).send('Account already exists');
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        await connection.execute(insertQuery, [email, hashedPassword, username]);
        res.send('Registration successful');
      }
    } catch (err) {
      res.status(500).send('Server error');
    }
  };

  module.exports = { login, register };