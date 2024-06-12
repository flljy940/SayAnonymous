const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Orbital123',
  database: 'my_db'
});

module.exports = connection;
