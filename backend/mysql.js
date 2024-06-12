const mysql = require('mysql2/promise');

const connectionConfig = {
    host: 'localhost',
    user: 'root',
    password: 'Orbital123',
    database: 'my_db'
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
        connection.release();
    }
}

module.exports = { queryDatabase };