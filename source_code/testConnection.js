const mysql = require('mysql2/promise');
require('dotenv').config();

async function testConnection() {
    try {
        console.log("Attempting to connect to MySQL...");
        
        const connection = await mysql.createConnection({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE
        });

        console.log('Connected to MySQL');
        await connection.end();
        
        return 'Connected to MySQL';
    } catch (error) {
        console.error('Error connecting to MySQL:', error.message);
        throw new Error('Error connecting to MySQL');
    }
}

testConnection()
    .then((message) => console.log(message))
    .catch((error) => console.error(error));
