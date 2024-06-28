import express from 'express'

import { getParkingLot, getParkingLotWithId, createParkingLot } from './database.js'

const app = express()

app.get("/ParkingLot", async (req, res) => {
  const ParkingLot = await getParkingLot()
  res.send(ParkingLot)
})

app.get("/ParkingSpace", async (req, res) => {
    const ParkingSpace = await getParkingSpace()
    res.send(ParkingSpace)
})

app.get("/User", async (req, res) => {
  const User = await getUser()
  res.send(User)
})

app.get("/Vehicle", async (req, res) => {
  const Vehicle = await getVehicle()
  res.send(Vehicle)
})

app.get("/Reservation", async (req, res) => {
  const Reservation = await getReservation()
  res.send(Reservation)
})

app.get("/TransactionHistory", async (req, res) => {
  const TransactionHistory = await getTransactionHistory()
  res.send(TransactionHistory)
})

app.get("/Feedback", async (req, res) => {
  const Feedback = await getFeedback()
  res.send(TransactionHistory)
})

app.get("/ParkingLot/:id", async (req, res) => {
    const lot_id = req.params.id
    const ParkingLot = await getParkingLotWithId(lot_id)
    res.send(ParkingLot)
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })

  app.listen(8080, () => {
    console.log('Server is running on port 8080')
  })