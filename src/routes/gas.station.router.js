import { Router } from "express";

import {
  getGasStations,
  createGasStation,
  updateGasStation,
  deleteGasStation,
  getLatestGasStations,
  getNewGasStations,
} from "../controllers/gas.station.controller.js";

const GasStationRouter = Router();

GasStationRouter.get("/", getGasStations);
GasStationRouter.post("/", createGasStation);
GasStationRouter.put("/:id", updateGasStation);
GasStationRouter.delete("/:id", deleteGasStation);
GasStationRouter.get("/latest", getLatestGasStations);
GasStationRouter.get("/new/", getNewGasStations);

export default GasStationRouter;
