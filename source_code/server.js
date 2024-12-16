const express = require('express');
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

app.post('/save-parking-setup', async (req, res) => {
    const { zone, parkingSpot, durationType } = req.body;
    console.log('Attempting to save parking setup:', { zone, parkingSpot, durationType });

    try {
        const connection = await mysql.createConnection({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE
        });

        // Insert into SetupParking table
        const [results] = await connection.execute(
            'INSERT INTO SetupParking (zone, parking_spot, duration_type) VALUES (?, ?, ?)',
            [zone, parkingSpot, durationType]
        );

        await connection.end();

        console.log('Saved parking setup successfully:', results);
        res.json({ success: true, message: 'Parking setup saved successfully', results });
    } catch (error) {
        console.error('Error saving parking setup:', error.message);
        console.error(error); // Log the entire error object
        res.status(500).json({ success: false, message: 'Error saving parking setup', error });
    }
});

// New endpoint to save user profile
app.post('/save-user-profile', async (req, res) => {
    const { firstName, lastName, savedSchoolCampus } = req.body;
    console.log('Attempting to save user profile:', { firstName, lastName, savedSchoolCampus });

    try {
        const connection = await mysql.createConnection({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE
        });

        // Insert into User table
        const [results] = await connection.execute(
            'INSERT INTO User (first_name, last_name, saved_school_campus) VALUES (?, ?, ?)',
            [firstName, lastName, savedSchoolCampus]
        );

        await connection.end();

        console.log('Saved user profile successfully:', results);
        res.json({ success: true, message: 'User profile saved successfully', results });
    } catch (error) {
        console.error('Error saving user profile:', error.message);
        console.error(error); // Log the entire error object
        res.status(500).json({ success: false, message: 'Error saving user profile', error });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
