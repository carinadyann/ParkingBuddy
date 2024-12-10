// Use require instead of import for CommonJS modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

// Use require to import functions from database.js
const { 
  getParkingLot, 
  getParkingSpace, 
  getUser, 
  getVehicle, 
  getReservation, 
  getTransactionHistory, 
  getFeedback, 
  getEmployee, 
  getParkingLotWithId, 
  getParkingSpaceWithId, 
  getVehicleWithId, 
  getReservationWithId, 
  getTransactionHistoryWithId, 
  getFeedbackWithId, 
  getEmployeeWithId, 
  createParkingLot, 
  saveParkingSetup, 
  getSetupParkingWithId 
} = require('./database.js'); // Change to require

dotenv.config(); // Load environment variables from .env

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.get('/api/users', async (req, res) => {
  try {
    const users = await getUser();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
