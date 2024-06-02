// populate.js
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

async function populateDatabase() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE
        });

        await connection.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                password VARCHAR(255) NOT NULL
            )
        `);

        await connection.end();
        console.log('Database populated successfully');
    } catch (err) {
        console.error('Error populating database:', err);
    }
}

populateDatabase();
