import { gasStationRepository } from "../repositories/index.js";

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

  async createGasStation(gasStation) {
    const newGasStation = await gasStationRepository.create(gasStation);
    return newGasStation;
  }

  async createStations() {
    console.log("Creating local stations");
    const localStations = await gasStationRepository.getAllLocalStations();
    console.log("Local stations retrieved");

    // Use Promise.all to create all stations at the same time
    const stationsPromises = localStations.map((station) => {
      const createdStation = this.createGasStation(station);
      const { stationId } = createdStation;
      return createdStation;
    });
    const stations = await Promise.all(stationsPromises);
    // return stations id
    return stations.map((station) => station.stationId);
  }

  async deleteGasStation(id) {
    const deletedGasStation = await gasStationRepository.delete(id);
    return deletedGasStation;
  }
}

export default GasStationService;
