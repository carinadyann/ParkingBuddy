const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});

// Existing tables in your schema: ParkingLot, SetupParking, User, UserCredentials, Vehicle, Reservation, TransactionHistory, Employee, PaymentMethod

async function getParkingLot() {
  const [rows] = await pool.query("SELECT * FROM ParkingLot");
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

async function getEmployee() {
  const [rows] = await pool.query("SELECT * FROM Employee");
  return rows;
}

async function getPaymentMethods(userId) {
  const [rows] = await pool.query(`
    SELECT *
    FROM PaymentMethod
    WHERE user_id = ?
  `, [userId]);
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

// Save User Profile
async function saveUserProfile(firstName, lastName, savedSchoolCampus) {
  const [result] = await pool.query(`
    INSERT INTO User (first_name, last_name, saved_school_campus)
    VALUES (?, ?, ?)
  `, [firstName, lastName, savedSchoolCampus]);
  const user_id = result.insertId;
  return getUserWithId(user_id);
}

// Get User by ID
async function getUserWithId(user_id) {
  const [rows] = await pool.query(`
    SELECT *
    FROM User
    WHERE user_id = ?
  `, [user_id]);

  return rows[0];
}

// Save Vehicle Data
async function saveVehicleData(userId, licensePlate, makeModel, year, color) {
  const [result] = await pool.query(`
    INSERT INTO Vehicle (user_id, license_plate, make_model, year, color)
    VALUES (?, ?, ?, ?, ?)
  `, [userId, licensePlate, makeModel, year, color]);
  const vehicle_id = result.insertId;
  return getVehicleWithId(vehicle_id);
}

// Save Payment Method
async function savePaymentMethod(userId, cardNumber, cardType, expirationDate, cvv) {
  const [result] = await pool.query(`
    INSERT INTO PaymentMethod (user_id, card_number, card_type, expiration_date, cvv)
    VALUES (?, ?, ?, ?, ?)
  `, [userId, cardNumber, cardType, expirationDate, cvv]);
  const payment_id = result.insertId;
  return getPaymentMethodById(payment_id);
}

async function getPaymentMethodById(payment_id) {
  const [rows] = await pool.query(`
    SELECT *
    FROM PaymentMethod
    WHERE payment_id = ?
  `, [payment_id]);
  return rows[0];
}

module.exports = {
  getParkingLot,
  getUser,
  getVehicle,
  getReservation,
  getTransactionHistory,
  getEmployee,
  getPaymentMethods,
  getParkingLotWithId,
  getVehicleWithId,
  getReservationWithId,
  getTransactionHistoryWithId,
  getEmployeeWithId,
  createParkingLot,
  saveParkingSetup,
  getSetupParkingWithId,
  saveUserProfile,
  getUserWithId,
  saveVehicleData,
  savePaymentMethod,
  getPaymentMethodById
};
