import { Router } from "express";

import {
  getGasStations,
  createGasStation,
  updateGasStation,
  deleteGasStation,
} from "../controllers/gas.station.controller.js";

const GasStationRouter = Router();

GasStationRouter.get("/", getGasStations);
GasStationRouter.post("/", createGasStation);
GasStationRouter.put("/:id", updateGasStation);
GasStationRouter.delete("/:id", deleteGasStation);

export default GasStationRouter;
