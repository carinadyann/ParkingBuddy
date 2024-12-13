const express = require('express');
const { testConnection } = require('./testConnection'); // Adjust the path as necessary

const app = express();

app.use(express.json());

// General Query
app.get("/ParkingLot", async (req, res) => {
    const ParkingLot = await getParkingLot();
    res.send(ParkingLot);
});

app.get("/ParkingSpace", async (req, res) => {
    const ParkingSpace = await getParkingSpace();
    res.send(ParkingSpace);
});

app.get("/User", async (req, res) => {
    const User = await getUser();
    res.send(User);
});

app.get("/Vehicle", async (req, res) => {
    const Vehicle = await getVehicle();
    res.send(Vehicle);
});

app.get("/Reservation", async (req, res) => {
    const Reservation = await getReservation();
    res.send(Reservation);
});

app.get("/TransactionHistory", async (req, res) => {
    const TransactionHistory = await getTransactionHistory();
    res.send(TransactionHistory);
});

app.get("/Feedback", async (req, res) => {
    const Feedback = await getFeedback();
    res.send(Feedback);
});

app.get("/Employee", async (req, res) => {
    const Employee = await getEmployee();
    res.send(Feedback);
});

// Query with ID
app.get("/ParkingLot/:id", async (req, res) => {
    const lot_id = req.params.id;
    const ParkingLot = await getParkingLotWithId(lot_id);
    res.send(ParkingLot);
});

app.get("/ParkingSpace/:id", async (req, res) => {
    const space_id = req.params.id;
    const ParkingSpace = await getParkingSpaceWithId(space_id);
    res.send(ParkingSpace);
});

app.get("/User/:id", async (req, res) => {
    const user_id = req.params.id;
    const User = await getUserWithId(user_id);
    res.send(User);
});

app.get("/Vehicle/:id", async (req, res) => {
    const vehicle_id = req.params.id;
    const Vehicle = await getVehicleWithId(vehicle_id);
    res.send(Vehicle);
});

app.get("/Reservation/:id", async (req, res) => {
    const reservation_id = req.params.id;
    const Reservation = await getReservationWithId(reservation_id);
    res.send(Reservation);
});

app.get("/TransactionHistory/:id", async (req, res) => {
    const transaction_id = req.params.id;
    const TransactionHistory = await getTransactionHistoryWithId(transaction_id);
    res.send(TransactionHistory);
});

app.get("/Feedback/:id", async (req, res) => {
    const feedback_id = req.params.id;
    const Feedback = await getFeedbackWithId(feedback_id);
    res.send(Feedback);
});

app.get("/Employee/:id", async (req, res) => {
    const employee_id = req.params.id;
    const Employee = await getEmployeeWithId(employee_id);
    res.send(Employee);
});

// Create new Parking Lot
app.post("/ParkingLot", async (req, res) => {
    const { location, capacity, available_spaces } = req.body;
    const ParkingLot = await createParkingLot(location, capacity, available_spaces);
    res.status(201).send(ParkingLot);
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

// Error Handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(8080, () => {
    console.log('Server is running on port 8080');
});
