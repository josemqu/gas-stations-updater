import express from "express";
import dotenv from "dotenv";
import connectToDatabase from "./src/config/database.js";
import { updateGasStations } from "./src/controllers/gasStationController.js";

dotenv.config();

const app = express();

// Define the route for updating gas stations
app.post("/update-gas-stations", updateGasStations);

// Connect to the database and start the app
connectToDatabase().then(() => {
  // Start the Express server
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
