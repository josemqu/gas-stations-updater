import { updateAllGasStationData } from "../services/gasStationService.js";

const updateGasStations = async (req, res) => {
  try {
    await updateAllGasStationData();
    res.status(200).json({ message: "Gas stations updated successfully" });
  } catch (error) {
    console.error("Error updating gas stations", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { updateGasStations };
