import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise();

// Get ParkingLot data
export async function getParkingLot() {
    const [rows] = await pool.query("SELECT * FROM ParkingLot");
    return rows;
}

// Get SetupParking data (replaces ParkingSpace)
export async function getSetupParking() {
    const [rows] = await pool.query("SELECT * FROM SetupParking");
    return rows;
}

// Get User data
export async function getUser() {
    const [rows] = await pool.query("SELECT * FROM User");
    return rows;
}

// Get Vehicle data
export async function getVehicle() {
    const [rows] = await pool.query("SELECT * FROM Vehicle");
    return rows;
}

// Get Reservation data
export async function getReservation() {
    const [rows] = await pool.query("SELECT * FROM Reservation");
    return rows;
}

// Get TransactionHistory data
export async function getTransactionHistory() {
    const [rows] = await pool.query("SELECT * FROM TransactionHistory");
    return rows;
}

// Get Employee data
export async function getEmployee() {
    const [rows] = await pool.query("SELECT * FROM Employee");
    return rows;
}

// Get ParkingLot by ID
export async function getParkingLotWithId(lot_id) {
    const [rows] = await pool.query(`
        SELECT *
        FROM ParkingLot
        WHERE lot_id = ?
    `, [lot_id]);

    return rows[0];
}

// Get SetupParking by ID (replaces ParkingSpace)
export async function getSetupParkingWithId(setup_parking_id) {
    const [rows] = await pool.query(`
        SELECT *
        FROM SetupParking
        WHERE setup_parking_id = ?
    `, [setup_parking_id]);

    return rows[0];
}

// Get Vehicle by ID
export async function getVehicleWithId(vehicle_id) {
    const [rows] = await pool.query(`
        SELECT *
        FROM Vehicle
        WHERE vehicle_id = ?
    `, [vehicle_id]);

    return rows[0];
}

// Get Reservation by ID
export async function getReservationWithId(reservation_id) {
    const [rows] = await pool.query(`
        SELECT *
        FROM Reservation
        WHERE reservation_id = ?
    `, [reservation_id]);

    return rows[0];
}

// Get TransactionHistory by ID
export async function getTransactionHistoryWithId(transaction_id) {
    const [rows] = await pool.query(`
        SELECT *
        FROM TransactionHistory
        WHERE transaction_id = ?
    `, [transaction_id]);

    return rows[0];
}

// Get Employee by ID
export async function getEmployeeWithId(employee_id) {
    const [rows] = await pool.query(`
        SELECT *
        FROM Employee
        WHERE employee_id = ?
    `, [employee_id]);

    return rows[0];
}

// Create a new ParkingLot
export async function createParkingLot(location, capacity, available_spaces) {
    const [result] = await pool.query(`
        INSERT INTO ParkingLot (location, capacity, available_spaces)
        VALUES (?, ?, ?)
    `, [location, capacity, available_spaces]);
    const lot_id = result.insertId;
    return getParkingLotWithId(lot_id);
}
