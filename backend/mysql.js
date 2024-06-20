// mysql.js
const mysql = require('mysql2/promise');

const connectionConfig = {
    host: 'localhost',
    user: 'appuser',
    password: 'apppassword',
    database: 'user'
};

const pool = mysql.createPool(connectionConfig);

async function queryDatabase(sql) {
    const connection = await pool.getConnection();
    try {
        const [results] = await connection.query(sql);
        return results;
    } catch (error) {
        throw error;
    } finally {
        if (connection) connection.release();
    }
}

module.exports = { queryDatabase };
