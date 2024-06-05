import express from 'express'

import { getParkingLot, getParkingLotWithId, createParkingLot } from './database.js'

const app = express()

app.get("/ParkingLot", async (req, res) => {
    const ParkingLot = await getParkingLot()
    res.send(ParkingLot)
})

app.get("/ParkingLot/:lot_id", async (req, res) => {
    const lot_id = req.params.lot_id
    const ParkingLot = await getParkingLot(lot_id)
    res.send(ParkingLot)
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })

  app.listen(8080, () => {
    console.log('Server is running on port 8080')
  })