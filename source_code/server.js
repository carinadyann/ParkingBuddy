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

    try {
        const connection = await mysql.createConnection({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE
        });

        const [results] = await connection.execute(
            'INSERT INTO ParkingSetup (zone, parkingSpot, durationType) VALUES (?, ?, ?)',
            [zone, parkingSpot, durationType]
        );

        await connection.end();

        res.json({ success: true, message: 'Parking setup saved successfully', results });
    } catch (error) {
        console.error('Error saving parking setup:', error);
        res.status(500).json({ success: false, message: 'Error saving parking setup', error });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
