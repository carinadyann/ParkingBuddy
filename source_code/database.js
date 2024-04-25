import mysql from 'mysql2'

import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

async function getParkingLot(){
    const [rows] = await pool.query("SELECT * FROM ParkingLot")
    return rows
}

async function getParkingLotWithId(lot_id) {
    const [rows] = await pool.query(`
    SELECT *
    FROM ParkingLot
    WHERE lot_id = ?
    `, [lot_id])

    return rows[0]
}

async function createParkingLot(location, capacity, available_spaces) {
    await pool.query(``)
}

const ParkingLot = await getParkingLotWithId(1)
console.log(ParkingLot)   