import express from 'express'

import { getParkingLot, getParkingLotWithId, createParkingLot } from './database.js'

const app = express()

app.use(express.json())

app.get("/ParkingLot", async (req, res) => {
    const ParkingLot = await getParkingLot()
    res.send(ParkingLot)
})

app.get("/ParkingLot/:id", async (req, res) => {
    const lot_id = req.params.id
    const ParkingLot = await getParkingLotWithId(lot_id)
    res.send(ParkingLot)
})

app.post("/ParkingLot", async (req, res) => {
  const { location, capacity, available_spaces} = req.body
  const ParkingLot = await createParkingLot(location, capacity, available_spaces)
  res.status(201).send(ParkingLot)

})

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })

  app.listen(8080, () => {
    console.log('Server is running on port 8080')
  })