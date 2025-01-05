import { gasStationService } from "../services/index.js";
import { priceService } from "../services/index.js";

export async function getGasStations(req, res) {
  try {
    const gasStations = await gasStationService.getGasStations();
    return res.status(200).json({
      ok: true,
      result: "Gas Stations found successfully",
      payload: gasStations,
    });
  } catch (error) {
    return res.status(500).send({
      ok: false,
      result: "GasStations not found",
      message: error.message,
    });
  }
}

export async function createGasStation(req, res) {
  try {
    const gasStation = await gasStationService.createGasStation(req.body);
    return res.status(201).send({
      ok: true,
      result: "Gas Station created successfully",
      payload: gasStation,
    });
  } catch (error) {
    return res.status(500).send({
      ok: false,
      result: "Gas Station not created",
      message: error.message,
    });
  }
}

export async function updateGasStations(req, res) {
  try {
    const stations = await priceService.convertPrices();
    const gasStation = await gasStationService.updateGasStations(stations);

    return res.status(200).json({
      ok: true,
      result: "Gas Station updated successfully",
      payload: gasStation,
    });
  } catch (error) {
    return res.status(500).send({
      ok: false,
      result: "Gas Station not updated",
      message: error.message,
    });
  }
}

export async function deleteGasStation(req, res) {
  try {
    const gasStation = await gasStationService.deleteGasStation(req.params.id);
    return res.status(200).json({
      ok: true,
      result: "Gas Station deleted successfully",
      payload: gasStation,
    });
  } catch (error) {
    return res.status(500).send({
      ok: false,
      result: "Gas Station not deleted",
      message: error.message,
    });
  }
}
