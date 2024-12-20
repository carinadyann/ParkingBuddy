import mysql from 'mysql2'

import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

<<<<<<< Updated upstream
export async function getParkingLot(){
    const [rows] = await pool.query("SELECT * FROM ParkingLot")
    return rows
=======
// Existing tables in your schema: ParkingLot, SetupParking, User, UserCredentials, Vehicle, Reservation, TransactionHistory, Employee, PaymentMethod

async function getParkingLot() {
  const [rows] = await pool.query("SELECT * FROM ParkingLot");
  return rows;
>>>>>>> Stashed changes
}

export async function getParkingSpace(){
    const [rows] = await pool.query("SELECT * FROM ParkingSpace")
    return rows
}

export async function getUser(){
    const [rows] = await pool.query("SELECT * FROM User")
    return rows
}

export async function getVehicle(){
    const [rows] = await pool.query("SELECT * FROM ParkingLot")
    return rows
}

export async function getReservation(){
    const [rows] = await pool.query("SELECT * FROM Reservation")
    return rows
}

export async function getTransactionHistory(){
    const [rows] = await pool.query("SELECT * FROM TransactionHistory")
    return rows
}

<<<<<<< Updated upstream
export async function getFeedback(){
    const [rows] = await pool.query("SELECT * FROM Feedback")
    return rows
}

export async function getEmployee(){
    const [rows] = await pool.query("SELECT * FROM Employee")
    return rows
}


//getParkingLotWithId Function
export async function getParkingLotWithId(lot_id) {
    const [rows] = await pool.query(`
=======
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
>>>>>>> Stashed changes
    SELECT *
    FROM ParkingLot
    WHERE lot_id = ?
    `, [lot_id])

    return rows[0]
}

//getParkingSpaceWithId Function
export async function getParkingSpaceWithId(space_id) {
    const [rows] = await pool.query(`
    SELECT *
    FROM ParkingSpace
    WHERE space_id = ?
    `, [space_id])

    return rows[0]
}

//getVehicleWithId Function
export async function getVehicleWithId(vehicle_id) {
    const [rows] = await pool.query(`
    SELECT *
    FROM Vehcile
    WHERE vehicle_id = ?
    `, [vehicle_id])

    return rows[0]
}

//getVehicleWithId Function
export async function getVehicleWithId(vehicle_id) {
    const [rows] = await pool.query(`
    SELECT *
    FROM Vehcile
    WHERE vehicle_id = ?
    `, [vehicle_id])

    return rows[0]
}

//getReservationWithId Function
export async function getReservationWithId(reservation_id) {
    const [rows] = await pool.query(`
    SELECT *
    FROM Reservation
    WHERE reservation_id = ?
    `, [reservation_id])

    return rows[0]
}

//getTransactionWithId Function
export async function getTransactionHistoryWithId(transaction_id) {
    const [rows] = await pool.query(`
    SELECT *
    FROM TransactionHistory
    WHERE transaction_id = ?
    `, [transaction_id])

    return rows[0]
}

//getFeedbackWithId Function
export async function getFeedbackWithId(feedback_id) {
    const [rows] = await pool.query(`
    SELECT *
    FROM Feedback
    WHERE feedback_id = ?
    `, [feedback_id])

    return rows[0]
}

//getEmployeeWithId Function
export async function getEmployeeWithId(employee_id) {
    const [rows] = await pool.query(`
    SELECT *
    FROM Employee
    WHERE temployee_id = ?
    `, [employee_id])

    return rows[0]
}


// Create parking lot function
export async function createParkingLot(location, capacity, available_spaces) {
    const [result] = await pool.query(`
    INSERT INTO  ParkingLot (location, capacity, available_spaces)
    VALUES (?, ?, ?)
    `, [location, capacity, available_spaces])
    const lot_id = result.insertId;
    return getParkingLotWithId(lot_id)
}

//const result = await createParkingLot('test location', 100, 50)
//console.log(result)
//const ParkingLot = await getParkingLotWithId(1)
//console.log(ParkingLot)

<<<<<<< Updated upstream
=======
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
>>>>>>> Stashed changes
