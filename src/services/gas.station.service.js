import { gasStationRepository } from "../repositories/index.js";
import axios from "axios";
import config from "../config/config.js";

class GasStationService {
  constructor() {}

  async getGasStations() {
    const gasStations = await gasStationRepository.getAll();
    return gasStations;
  }

  async getGasStation(id) {
    const gasStation = await gasStationRepository.getById(id);
    return gasStation;
  }

  async updateGasStations(stations) {
    const gasStations = await gasStationRepository.update(stations);
    return gasStations;
  }

  async deleteGasStation(id) {
    const deletedGasStation = await gasStationRepository.delete(id);
    return deletedGasStation;
  }
}

export default GasStationService;
