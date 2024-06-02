// populate.js
const mysql = require('mysql2/promise');

async function populateDatabase() {
    try {
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'real__CYY04',
            database: 'signup-system'
        });

        // Create users table
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
