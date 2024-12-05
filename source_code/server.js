import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { saveParkingSetup } from './database.js'; // Adjust the path if necessary

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Route to handle saving parking setup
app.post('/save-parking-setup', async (req, res) => {
    const { zone, parkingSpot, durationType } = req.body;

    try {
        const result = await saveParkingSetup(zone, parkingSpot, durationType);
        res.status(200).json(result);
    } catch (error) {
        console.error('Error saving parking setup:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
