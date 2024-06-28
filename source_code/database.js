import mysql from 'mysql2'

import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

export async function getParkingLot(){
    const [rows] = await pool.query("SELECT * FROM ParkingLot")
    return rows
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

export async function getParkingLotWithId(lot_id) {
    const [rows] = await pool.query(`
    SELECT *
    FROM ParkingLot
    WHERE lot_id = ?
    `, [lot_id])

    return rows[0]
}

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