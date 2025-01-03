import cron from "node-cron";
import dotenv from "dotenv";
import connectToDatabase from "./config/database.js";
import { updateGasStationData } from "./services/gasStationService.js";

dotenv.config();

// Function to fetch data for all station IDs
async function updateAllGasStationData() {
  const stationIds = [108, 109, 110]; // Replace with your desired station IDs

  for (const stationId of stationIds) {
    await updateGasStationData(stationId);
  }
}

// Connect to the database and start the app
connectToDatabase().then(() => {
  // Schedule the data update to run once a day
  cron.schedule("0 0 * * *", () => {
    updateAllGasStationData();
  });
});
