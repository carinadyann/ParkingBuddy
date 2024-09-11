const mysql = require('mysql2');
const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');

dotenv.config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise();

const app = express();
const port = 3000;  // You can choose any available port

app.use(cors());
app.use(express.json());

// Get ParkingLot data
app.get('/parking-lot', async (req, res) => {
    try {
        const rows = await getParkingLot();
        res.status(200).json(rows);
    } catch (error) {
        console.error('Error getting parking lot data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const getParkingLot = async () => {
    const [rows] = await pool.query("SELECT * FROM ParkingLot");
    return rows;
};

// Get SetupParking data (replaces ParkingSpace)
app.get('/setup-parking', async (req, res) => {
    try {
        const rows = await getSetupParking();
        res.status(200).json(rows);
    } catch (error) {
        console.error('Error getting setup parking data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const getSetupParking = async () => {
    const [rows] = await pool.query("SELECT * FROM SetupParking");
    return rows;
};

// Get User data
app.get('/user', async (req, res) => {
    try {
        const rows = await getUser();
        res.status(200).json(rows);
    } catch (error) {
        console.error('Error getting user data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const getUser = async () => {
    const [rows] = await pool.query("SELECT * FROM User");
    return rows;
};

// Get Vehicle data
app.get('/vehicle', async (req, res) => {
    try {
        const rows = await getVehicle();
        res.status(200).json(rows);
    } catch (error) {
        console.error('Error getting vehicle data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const getVehicle = async () => {
    const [rows] = await pool.query("SELECT * FROM Vehicle");
    return rows;
};

// Get Reservation data
app.get('/reservation', async (req, res) => {
    try {
        const rows = await getReservation();
        res.status(200).json(rows);
    } catch (error) {
        console.error('Error getting reservation data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const getReservation = async () => {
    const [rows] = await pool.query("SELECT * FROM Reservation");
    return rows;
};

// Get TransactionHistory data
app.get('/transaction-history', async (req, res) => {
    try {
        const rows = await getTransactionHistory();
        res.status(200).json(rows);
    } catch (error) {
        console.error('Error getting transaction history data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const getTransactionHistory = async () => {
    const [rows] = await pool.query("SELECT * FROM TransactionHistory");
    return rows;
};

// Get Employee data
app.get('/employee', async (req, res) => {
    try {
        const rows = await getEmployee();
        res.status(200).json(rows);
    } catch (error) {
        console.error('Error getting employee data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const getEmployee = async () => {
    const [rows] = await pool.query("SELECT * FROM Employee");
    return rows;
};

// Get ParkingLot by ID
app.get('/parking-lot/:id', async (req, res) => {
    try {
        const rows = await getParkingLotWithId(req.params.id);
        res.status(200).json(rows);
    } catch (error) {
        console.error('Error getting parking lot by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const getParkingLotWithId = async (lot_id) => {
    const [rows] = await pool.query(`
        SELECT *
        FROM ParkingLot
        WHERE lot_id = ?
    `, [lot_id]);

    return rows[0];
};

// Get SetupParking by ID (replaces ParkingSpace)
app.get('/setup-parking/:id', async (req, res) => {
    try {
        const rows = await getSetupParkingWithId(req.params.id);
        res.status(200).json(rows);
    } catch (error) {
        console.error('Error getting setup parking by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const getSetupParkingWithId = async (setup_parking_id) => {
    const [rows] = await pool.query(`
        SELECT *
        FROM SetupParking
        WHERE setup_parking_id = ?
    `, [setup_parking_id]);

    return rows[0];
};

// Get Vehicle by ID
app.get('/vehicle/:id', async (req, res) => {
    try {
        const rows = await getVehicleWithId(req.params.id);
        res.status(200).json(rows);
    } catch (error) {
        console.error('Error getting vehicle by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const getVehicleWithId = async (vehicle_id) => {
    const [rows] = await pool.query(`
        SELECT *
        FROM Vehicle
        WHERE vehicle_id = ?
    `, [vehicle_id]);

    return rows[0];
};

// Get Reservation by ID
app.get('/reservation/:id', async (req, res) => {
    try {
        const rows = await getReservationWithId(req.params.id);
        res.status(200).json(rows);
    } catch (error) {
        console.error('Error getting reservation by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const getReservationWithId = async (reservation_id) => {
    const [rows] = await pool.query(`
        SELECT *
        FROM Reservation
        WHERE reservation_id = ?
    `, [reservation_id]);

    return rows[0];
};

// Get TransactionHistory by ID
app.get('/transaction-history/:id', async (req, res) => {
    try {
        const rows = await getTransactionHistoryWithId(req.params.id);
        res.status(200).json(rows);
    } catch (error) {
        console.error('Error getting transaction history by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const getTransactionHistoryWithId = async (transaction_id) => {
    const [rows] = await pool.query(`
        SELECT *
        FROM TransactionHistory
        WHERE transaction_id = ?
    `, [transaction_id]);

    return rows[0];
};

// Get Employee by ID
app.get('/employee/:id', async (req, res) => {
    try {
        const rows = await getEmployeeWithId(req.params.id);
        res.status(200).json(rows);
    } catch (error) {
        console.error('Error getting employee by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const getEmployeeWithId = async (employee_id) => {
    const [rows] = await pool.query(`
        SELECT *
        FROM Employee
        WHERE employee_id = ?
    `, [employee_id]);

    return rows[0];
};

// Create a new ParkingLot
app.post('/save-parking', async (req, res) => {
    const { location, capacity, available_spaces } = req.body;
    try {
        const result = await createParkingLot(location, capacity, available_spaces);
        res.status(200).json(result);
    } catch (error) {
        console.error('Error saving parking data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const createParkingLot = async (location, capacity, available_spaces) => {
    const [result] = await pool.query(`
        INSERT INTO ParkingLot (location, capacity, available_spaces)
        VALUES (?, ?, ?)
    `, [location, capacity, available_spaces]);
    const lot_id = result.insertId;
    return getParkingLotWithId(lot_id);
};

app.listen(port, () => {
    console.log(`Server is running on http://localhost:3000`);
});

module.exports = {
    getParkingLot,
    getSetupParking,
    getUser,
    getVehicle,
    getReservation,
    getTransactionHistory,
    getEmployee,
    getParkingLotWithId,
    getSetupParkingWithId,
    getVehicleWithId,
    getReservationWithId,
    getTransactionHistoryWithId,
    getEmployeeWithId,
    createParkingLot
};
