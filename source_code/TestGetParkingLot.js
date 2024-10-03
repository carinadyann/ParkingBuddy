// Import the required modules
const mysql = require('mysql2/promise');
require('dotenv').config();

// Create a pool of database connections
const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE

});

// Define the getParkingLot function
const getParkingLot = async () => {
    try {
        console.log("getParkingLot function called");
        const [rows] = await pool.query("SELECT * FROM ParkingLot");
        console.log("Database query result:", rows);
        return rows;
    } catch (error) {
        console.error("Error querying the database:", error);
        throw error; // Rethrow the error after logging it
    }
};

// Test the function
getParkingLot()
    .then(rows => {
        console.log("Parking lots retrieved:", rows);
    })
    .catch(error => {
        console.error("Error:", error);
    })
    .finally(() => {
        pool.end(); // Close the database connection
    });
