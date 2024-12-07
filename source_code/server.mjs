import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { 
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
} from './database.mjs'; 

dotenv.config();

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
