import { gasStationService } from "../services/index.js";
import { mainService } from "../services/index.js";

export async function getGasStations(req, res) {
  try {
    const gasStations = await gasStationService.getGasStations();
    return res.status(200).json({
      ok: true,
      result: "GasStations found successfully",
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
      result: "GasStation created successfully",
      payload: gasStation,
    });
  } catch (error) {
    return res.status(500).send({
      ok: false,
      result: "GasStation not created",
      message: error.message,
    });
  }
}

export async function updateGasStation(req, res) {
  try {
    const gasStation = await gasStationService.updateGasStation(
      req.params.id,
      req.body
    );
    return res.status(200).json({
      ok: true,
      result: "GasStation updated successfully",
      payload: gasStation,
    });
  } catch (error) {
    return res.status(500).send({
      ok: false,
      result: "GasStation not updated",
      message: error.message,
    });
  }
}

export async function deleteGasStation(req, res) {
  try {
    const gasStation = await gasStationService.deleteGasStation(req.params.id);
    return res.status(200).json({
      ok: true,
      result: "GasStation deleted successfully",
      payload: gasStation,
    });
  } catch (error) {
    return res.status(500).send({
      ok: false,
      result: "GasStation not deleted",
      message: error.message,
    });
  }
}

export async function getLatestGasStations(req, res) {
  try {
    const gasStations = await gasStationService.getLatestGasStations();
    return res.status(200).json({
      ok: true,
      result: "GasStations found successfully",
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

export async function getNewGasStations(req, res) {
  try {
    const { newGasStations, updatedGasStations } =
      await mainService.getNewGasStations();
    return res.status(200).json({
      ok: true,
      result: "New Gas Stations found successfully",
      payload: { newGasStations, updatedGasStations },
    });
  } catch (error) {
    return res.status(500).send({
      ok: false,
      result: "New Gas Stations not found",
      message: error.message,
    });
  }
}
