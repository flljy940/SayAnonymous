// test-db-connection.js
const mysql = require('./config/db');

async function testConnection() {
    try {
        const [rows] = await mysql.query('SELECT 1 + 1 AS result');
        console.log('Database connection successful:', rows);
    } catch (err) {
        console.error('Database connection failed:', err);
    }
}

testConnection();
