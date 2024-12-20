<<<<<<< Updated upstream
import express from 'express'
=======
const express = require('express');
const mysql = require('mysql2/promise'); // Ensure mysql2 is imported here
const {
    testConnection,
    getParkingLot, getUser, getVehicle, getReservation, getTransactionHistory, getEmployee,
    getParkingLotWithId, getVehicleWithId, getReservationWithId, getTransactionHistoryWithId,
    getEmployeeWithId,
    createParkingLot, saveVehicleData, getPaymentMethods // Include all required functions
} = require('./database'); // Adjust the path as necessary
>>>>>>> Stashed changes

import { 
  getParkingLot, 
  getParkingLotWithId, 
  createParkingLot, 
  getParkingSpace, 
  getParkingSpaceWithId, 
  getUser, 
  getUserWithId, 
  getVehicle, 
  getVehicleWithId, 
  getReservation, 
  getReservationWithId, 
  getTransactionHistory, 
  getTransactionHistoryWithId, 
  getFeedback, 
  getFeedbackWithId, 
  getEmployee, 
  getEmployeeWithId 
} from './database.js'

const app = express()

app.use(express.json())

// General Query Routes
app.get("/ParkingLot", async (req, res) => {
  const ParkingLot = await getParkingLot()
  res.send(ParkingLot)
})

<<<<<<< Updated upstream
app.get("/ParkingSpace", async (req, res) => {
  const ParkingSpace = await getParkingSpace()
  res.send(ParkingSpace)
})

=======
>>>>>>> Stashed changes
app.get("/User", async (req, res) => {
  const User = await getUser()
  res.send(User)
})

app.get("/Vehicle", async (req, res) => {
  const Vehicle = await getVehicle()
  res.send(Vehicle)
})

app.get("/Reservation", async (req, res) => {
  const Reservation = await getReservation()
  res.send(Reservation)
})

app.get("/TransactionHistory", async (req, res) => {
  const TransactionHistory = await getTransactionHistory()
  res.send(TransactionHistory)
})

<<<<<<< Updated upstream
app.get("/Feedback", async (req, res) => {
  const Feedback = await getFeedback()
  res.send(Feedback)
})

=======
>>>>>>> Stashed changes
app.get("/Employee", async (req, res) => {
  const Employee = await getEmployee()
  res.send(Feedback)
})

// Payment Methods
app.get("/PaymentMethods/:userId", async (req, res) => {
    const userId = req.params.userId;
    try {
        const paymentMethods = await getPaymentMethods(userId);
        res.send(paymentMethods);
    } catch (error) {
        console.error('Error fetching payment methods:', error);
        res.status(500).json({ success: false, message: 'Error fetching payment methods', error });
    }
});

// Query with ID
app.get("/ParkingLot/:id", async (req, res) => {
  const lot_id = req.params.id
  const ParkingLot = await getParkingLotWithId(lot_id)
  res.send(ParkingLot)
})

<<<<<<< Updated upstream
app.get("/ParkingSpace/:id", async (req, res) => {
  const space_id = req.params.id
  const ParkingSpace = await getParkingSpaceWithId(space_id)
  res.send(ParkingSpace)
})

app.get("/User/:id", async (req, res) => {
  const user_id = req.params.id
  const User = await getUserWithId(user_id)
  res.send(User)
})
=======
app.get("/User/:id", async (req, res) => {
    const user_id = req.params.id;
    const UserWithId = await require('./database').getUserWithId(user_id);
    res.send(UserWithId);
});
>>>>>>> Stashed changes

app.get("/Vehicle/:id", async (req, res) => {
  const vehicle_id = req.params.id
  const Vehicle = await getVehicleWithId(vehicle_id)
  res.send(Vehicle)
})

app.get("/Reservation/:id", async (req, res) => {
  const reservation_id = req.params.id
  const Reservation = await getReservationWithId(reservation_id)
  res.send(Reservation)
})

app.get("/TransactionHistory/:id", async (req, res) => {
  const transaction_id = req.params.id
  const TransactionHistory = await getTransactionHistoryWithId(transaction_id)
  res.send(TransactionHistory)
})

<<<<<<< Updated upstream
app.get("/Feedback/:id", async (req, res) => {
  const feedback_id = req.params.id
  const Feedback = await getFeedbackWithId(feedback_id)
  res.send(Feedback)
})

=======
>>>>>>> Stashed changes
app.get("/Employee/:id", async (req, res) => {
  const employee_id = req.params.id
  const Employee = await getEmployeeWithId(employee_id)
  res.send(Employee)
})

// Create new Parking Lot
app.post("/ParkingLot", async (req, res) => {
<<<<<<< Updated upstream
  const { location, capacity, available_spaces } = req.body
  const ParkingLot = await createParkingLot(location, capacity, available_spaces)
  res.status(201).send(ParkingLot)
})
=======
    const { location, capacity, available_spaces } = req.body;
    try {
        const ParkingLotData = await createParkingLot(location, capacity, available_spaces);
        res.status(201).send(ParkingLotData);
    } catch (error) {
        console.error('Error creating parking lot:', error);
        res.status(500).json({ success: false, message: 'Error creating parking lot', error });
    }
});

// Create new Vehicle
app.post("/Vehicle", async (req, res) => {
    const { userId, licensePlate, makeModel, year, color } = req.body;
    try {
        const vehicleData = await saveVehicleData(userId, licensePlate, makeModel, year, color);
        res.status(201).send(vehicleData);
    } catch (error) {
        console.error('Error saving vehicle data:', error);
        res.status(500).json({ success: false, message: 'Error saving vehicle data', error });
    }
});

// Create new Payment Method
app.post('/PaymentMethod', async (req, res) => {
    console.log('Received data for PaymentMethod:', req.body); // Debug received data
    const { userId, cardholderName, cardNumber, expirationDate, cvv, cardType } = req.body;

    // Check if all required fields are present
    if (!userId || !cardholderName || !cardNumber || !expirationDate || !cvv || !cardType) {
        console.error('Missing required fields:', req.body);
        return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    try {
        const connection = await mysql.createConnection({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
        });

        const [results] = await connection.execute(
            `INSERT INTO PaymentMethod (user_id, cardholder_name, card_number, expiration_date, cvv, card_type)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [userId, cardholderName, cardNumber, expirationDate, cvv, cardType]
        );

        console.log('Query executed successfully.');

        await connection.end();

        console.log('Card added successfully:', results);
        res.json({ success: true, message: 'Card added successfully.' });
    } catch (error) {
        console.error('Error adding card:', error);
        res.status(500).json({ success: false, message: 'Failed to add card.', error });
    }
});


app.post('/update-payment-method', async (req, res) => {
    const { userId, cardNumber, cardType } = req.body;

    try {
        const connection = await mysql.createConnection({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
        });

        await connection.execute(
            `UPDATE PaymentMethod 
             SET card_type = ?
             WHERE user_id = ? AND card_number = ?`,
            [cardType, userId, cardNumber]
        );

        await connection.end();

        res.json({ success: true, message: 'Payment method updated successfully.' });
    } catch (error) {
        console.error('Error updating payment method:', error);
        res.status(500).json({ success: false, message: 'Failed to update payment method.', error });
    }
});

// Test MySQL Connection
app.get('/test-connection', async (req, res) => {
    try {
        const message = await testConnection();
        res.send({ message });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});
>>>>>>> Stashed changes

// Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

app.listen(8080, () => {
  console.log('Server is running on port 8080')
})
