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

  async saveGasStation(gasStation) {
    const createdGasStation = await gasStationRepository.create(gasStation);
    return createdGasStation;
  }

  async updateGasStation(gasStation) {
    const id = await gasStationRepository.getIdByPropertyId(gasStation.id);
    const updatedGasStation = await gasStationRepository.update(id, gasStation);
    return updatedGasStation;
  }

  async deleteGasStation(id) {
    const deletedGasStation = await gasStationRepository.delete(id);
    return deletedGasStation;
  }

  async getLatestGasStations() {
    const endpoint = config.GAS_TENDER_ENDPOINT;
    const response = await axios.get(endpoint);
    const latestGasStations = response.data;
    return latestGasStations;
  }

  async renderGasStations() {
    const gasStations = await this.getGasStations();
    return gasStations;
  }
}

export default GasStationService;
