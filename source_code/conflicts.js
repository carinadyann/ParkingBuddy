const express = require("express");
const bodyParser = require("body-parser");
const { createSetupParking, createVehicle, getUser, getAllUsers, createUser, deleteUser } = require("./database");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// POST /save-parking Endpoint to save parking setup data
app.post("/save-parking", async (req, res) => {
  const { zone, parkingSpot, durationType, userId } = req.body;

  try {
    // Save the parking setup data to the database
    const result = await createSetupParking({ zone, parkingSpot, durationType, userId });

    res.status(201).json({ message: 'Parking setup saved successfully', data: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to save parking setup' });
  }
});

// POST /api/vehicles Endpoint to save vehicle data
app.post("/api/vehicles", async (req, res) => {
  const { vehicleId, userId, ...otherFields } = req.body;

  try {
    // Save the vehicle data to the database
    const result = await createVehicle({ vehicleId, userId, ...otherFields });

    res.status(201).json({ message: 'Vehicle saved successfully', data: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to save vehicle' });
  }
});

// GET /users/:id Endpoint to get a specific user by ID
app.get("/users/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await getUser(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve user' });
  }
});

// GET /users Endpoint to get all users
app.get("/users", async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve users' });
  }
});

// POST /users Endpoint to create a new user
app.post("/users", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await createUser({ name, email, password });
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create user' });
  }
});

// DELETE /users/:id Endpoint to delete a user by ID
app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await deleteUser(id);
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete user' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
