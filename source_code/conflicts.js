const express = require('express');
const { 
    testConnection,
    getParkingLot, getUser, getVehicle, getReservation, getTransactionHistory, getEmployee,
    getParkingLotWithId, getVehicleWithId, getReservationWithId, getTransactionHistoryWithId,
    getEmployeeWithId
} = require('./database'); // Adjust the path as necessary

const app = express();

app.use(express.json());

// General Query
app.get("/ParkingLot", async (req, res) => {
    const ParkingLotData = await getParkingLot();
    res.send(ParkingLotData);
});

// Remove /ParkingSpace since the table doesn't exist
// app.get("/ParkingSpace", async (req, res) => {
//     const ParkingSpace = await getParkingSpace();
//     res.send(ParkingSpace);
// });

app.get("/User", async (req, res) => {
    const UserData = await getUser();
    res.send(UserData);
});

app.get("/Vehicle", async (req, res) => {
    const VehicleData = await getVehicle();
    res.send(VehicleData);
});

app.get("/Reservation", async (req, res) => {
    const ReservationData = await getReservation();
    res.send(ReservationData);
});

app.get("/TransactionHistory", async (req, res) => {
    const TransactionHistoryData = await getTransactionHistory();
    res.send(TransactionHistoryData);
});

// Remove /Feedback routes since 'Feedback' table does not exist
// app.get("/Feedback", async (req, res) => {
//     const Feedback = await getFeedback();
//     res.send(Feedback);
// });

app.get("/Employee", async (req, res) => {
    const EmployeeData = await getEmployee();
    res.send(EmployeeData);
});

// Query with ID
app.get("/ParkingLot/:id", async (req, res) => {
    const lot_id = req.params.id;
    const ParkingLotData = await getParkingLotWithId(lot_id);
    res.send(ParkingLotData);
});

// Remove getParkingSpaceWithId references since the table doesn't exist
// app.get("/ParkingSpace/:id", async (req, res) => {
//     const space_id = req.params.id;
//     const ParkingSpace = await getParkingSpaceWithId(space_id);
//     res.send(ParkingSpace);
// });

app.get("/User/:id", async (req, res) => {
    const user_id = req.params.id;
    // Make sure getUserWithId is implemented and imported if you want to fetch single user
    // If not implemented, you can remove or implement it similarly to getVehicleWithId, etc.
    const UserWithId = await getUserWithId(user_id);
    res.send(UserWithId);
});

app.get("/Vehicle/:id", async (req, res) => {
    const vehicle_id = req.params.id;
    const VehicleWithId = await getVehicleWithId(vehicle_id);
    res.send(VehicleWithId);
});

app.get("/Reservation/:id", async (req, res) => {
    const reservation_id = req.params.id;
    const ReservationWithId = await getReservationWithId(reservation_id);
    res.send(ReservationWithId);
});

app.get("/TransactionHistory/:id", async (req, res) => {
    const transaction_id = req.params.id;
    const TransactionHistoryWithId = await getTransactionHistoryWithId(transaction_id);
    res.send(TransactionHistoryWithId);
});

// Remove feedback routes since Feedback table doesn't exist
// app.get("/Feedback/:id", async (req, res) => {
//     const feedback_id = req.params.id;
//     const FeedbackData = await getFeedbackWithId(feedback_id);
//     res.send(FeedbackData);
// });

app.get("/Employee/:id", async (req, res) => {
    const employee_id = req.params.id;
    const EmployeeData = await getEmployeeWithId(employee_id);
    res.send(EmployeeData);
});

// Create new Parking Lot
app.post("/ParkingLot", async (req, res) => {
    const { location, capacity, available_spaces } = req.body;
    const ParkingLotData = await createParkingLot(location, capacity, available_spaces);
    res.status(201).send(ParkingLotData);
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
