const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise();

// Get ParkingLot data
const getParkingLot = async () => {
    const [rows] = await pool.query("SELECT * FROM ParkingLot");
    return rows;
};

// Get SetupParking data (replaces ParkingSpace)
const getSetupParking = async () => {
    const [rows] = await pool.query("SELECT * FROM SetupParking");
    return rows;
};

// Get User data
const getUser = async () => {
    const [rows] = await pool.query("SELECT * FROM User");
    return rows;
};

// Get Vehicle data
const getVehicle = async () => {
    const [rows] = await pool.query("SELECT * FROM Vehicle");
    return rows;
};

// Get Reservation data
const getReservation = async () => {
    const [rows] = await pool.query("SELECT * FROM Reservation");
    return rows;
};

// Get TransactionHistory data
const getTransactionHistory = async () => {
    const [rows] = await pool.query("SELECT * FROM TransactionHistory");
    return rows;
};

// Get Employee data
const getEmployee = async () => {
    const [rows] = await pool.query("SELECT * FROM Employee");
    return rows;
};

// Get ParkingLot by ID
const getParkingLotWithId = async (lot_id) => {
    const [rows] = await pool.query(`
        SELECT *
        FROM ParkingLot
        WHERE lot_id = ?
    `, [lot_id]);

    return rows[0];
};

// Get SetupParking by ID (replaces ParkingSpace)
const getSetupParkingWithId = async (setup_parking_id) => {
    const [rows] = await pool.query(`
        SELECT *
        FROM SetupParking
        WHERE setup_parking_id = ?
    `, [setup_parking_id]);

    return rows[0];
};

// Get Vehicle by ID
const getVehicleWithId = async (vehicle_id) => {
    const [rows] = await pool.query(`
        SELECT *
        FROM Vehicle
        WHERE vehicle_id = ?
    `, [vehicle_id]);

    return rows[0];
};

// Get Reservation by ID
const getReservationWithId = async (reservation_id) => {
    const [rows] = await pool.query(`
        SELECT *
        FROM Reservation
        WHERE reservation_id = ?
    `, [reservation_id]);

    return rows[0];
};

// Get TransactionHistory by ID
const getTransactionHistoryWithId = async (transaction_id) => {
    const [rows] = await pool.query(`
        SELECT *
        FROM TransactionHistory
        WHERE transaction_id = ?
    `, [transaction_id]);

    return rows[0];
};

// Get Employee by ID
const getEmployeeWithId = async (employee_id) => {
    const [rows] = await pool.query(`
        SELECT *
        FROM Employee
        WHERE employee_id = ?
    `, [employee_id]);

    return rows[0];
};

// Create a new ParkingLot
const createParkingLot = async (location, capacity, available_spaces) => {
    const [result] = await pool.query(`
        INSERT INTO ParkingLot (location, capacity, available_spaces)
        VALUES (?, ?, ?)
    `, [location, capacity, available_spaces]);
    const lot_id = result.insertId;
    return getParkingLotWithId(lot_id);
};

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
