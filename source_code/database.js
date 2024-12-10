const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});

async function getParkingLot() {
  const [rows] = await pool.query("SELECT * FROM ParkingLot");
  return rows;
}

async function getParkingSpace() {
  const [rows] = await pool.query("SELECT * FROM ParkingSpace");
  return rows;
}

async function getUser() {
  const [rows] = await pool.query("SELECT * FROM User");
  return rows;
}

async function getVehicle() {
  const [rows] = await pool.query("SELECT * FROM Vehicle");
  return rows;
}

async function getReservation() {
  const [rows] = await pool.query("SELECT * FROM Reservation");
  return rows;
}

async function getTransactionHistory() {
  const [rows] = await pool.query("SELECT * FROM TransactionHistory");
  return rows;
}

async function getFeedback() {
  const [rows] = await pool.query("SELECT * FROM Feedback");
  return rows;
}

async function getEmployee() {
  const [rows] = await pool.query("SELECT * FROM Employee");
  return rows;
}

async function getParkingLotWithId(lot_id) {
  const [rows] = await pool.query(`
    SELECT *
    FROM ParkingLot
    WHERE lot_id = ?
  `, [lot_id]);

  return rows[0];
}

async function getParkingSpaceWithId(space_id) {
  const [rows] = await pool.query(`
    SELECT *
    FROM ParkingSpace
    WHERE space_id = ?
  `, [space_id]);

  return rows[0];
}

async function getVehicleWithId(vehicle_id) {
  const [rows] = await pool.query(`
    SELECT *
    FROM Vehicle
    WHERE vehicle_id = ?
  `, [vehicle_id]);

  return rows[0];
}

async function getReservationWithId(reservation_id) {
  const [rows] = await pool.query(`
    SELECT *
    FROM Reservation
    WHERE reservation_id = ?
  `, [reservation_id]);

  return rows[0];
}

async function getTransactionHistoryWithId(transaction_id) {
  const [rows] = await pool.query(`
    SELECT *
    FROM TransactionHistory
    WHERE transaction_id = ?
  `, [transaction_id]);

  return rows[0];
}

async function getFeedbackWithId(feedback_id) {
  const [rows] = await pool.query(`
    SELECT *
    FROM Feedback
    WHERE feedback_id = ?
  `, [feedback_id]);

  return rows[0];
}

async function getEmployeeWithId(employee_id) {
  const [rows] = await pool.query(`
    SELECT *
    FROM Employee
    WHERE employee_id = ?
  `, [employee_id]);

  return rows[0];
}

async function createParkingLot(location, capacity, available_spaces) {
  const [result] = await pool.query(`
    INSERT INTO ParkingLot (location, capacity, available_spaces)
    VALUES (?, ?, ?)
  `, [location, capacity, available_spaces]);
  const lot_id = result.insertId;
  return getParkingLotWithId(lot_id);
}

async function saveParkingSetup(zone, parkingSpot, durationType) {
  const [result] = await pool.query(`
    INSERT INTO SetupParking (zone, parking_spot, duration_type)
    VALUES (?, ?, ?)
  `, [zone, parkingSpot, durationType]);
  const setup_id = result.insertId;
  return getSetupParkingWithId(setup_id);
}

async function getSetupParkingWithId(setup_id) {
  const [rows] = await pool.query(`
    SELECT *
    FROM SetupParking
    WHERE setup_id = ?
  `, [setup_id]);

  return rows[0];
}

module.exports = {
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
};
