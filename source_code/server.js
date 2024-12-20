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
        console.error(error);
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
        console.error(error);
        res.status(500).json({ success: false, message: 'Error saving user profile', error });
    }
});

// New endpoint to save vehicle data
app.post('/save-vehicle', async (req, res) => {
    const { userId, licensePlate, makeModel, year, color } = req.body;
    console.log('Attempting to save vehicle data:', { userId, licensePlate, makeModel, year, color });

    try {
        const connection = await mysql.createConnection({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE
        });

        // Insert into Vehicle table
        const [results] = await connection.execute(`
            INSERT INTO Vehicle (user_id, license_plate, make_model, year, color)
            VALUES (?, ?, ?, ?, ?)
        `, [userId, licensePlate, makeModel, year, color]);

        await connection.end();

        console.log('Saved vehicle data successfully:', results);
        res.json({ success: true, message: 'Vehicle data saved successfully', results });
    } catch (error) {
        console.error('Error saving vehicle data:', error.message);
        console.error(error);
        res.status(500).json({ success: false, message: 'Error saving vehicle data', error });
    }
});

// New endpoint to save payment method
app.post('/save-payment-method', async (req, res) => {
    const { userId, cardholderName, cardNumber, cardType, expirationDate, cvv } = req.body;
    console.log('Received POST /save-payment-method with data:', req.body);

    // Validation: Ensure all required fields are present
    if (!userId || !cardholderName || !cardNumber || !cardType || !expirationDate || !cvv) {
        console.error('Missing required fields:', req.body);
        return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    try {
        const connection = await mysql.createConnection({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE
        });

        // Insert into PaymentMethod table including cardholder_name
        const [results] = await connection.execute(`
            INSERT INTO PaymentMethod (user_id, cardholder_name, card_number, card_type, expiration_date, cvv)
            VALUES (?, ?, ?, ?, ?, ?)
        `, [userId, cardholderName, cardNumber, cardType, expirationDate, cvv]);

        await connection.end();

        console.log('Saved payment method successfully:', results);
        res.json({ success: true, message: 'Payment method saved successfully', results });
    } catch (error) {
        console.error('Error saving payment method:', error.message);
        console.error(error);
        res.status(500).json({ success: false, message: 'Error saving payment method', error });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
