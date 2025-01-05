import { Router } from "express";

import {
  getGasStations,
  createGasStation,
  updateGasStations,
  deleteGasStation,
} from "../controllers/gas.station.controller.js";

const GasStationRouter = Router();

GasStationRouter.get("/", getGasStations);
GasStationRouter.post("/", createGasStation);
GasStationRouter.put("/update/", updateGasStations);
GasStationRouter.delete("/:id", deleteGasStation);

export default GasStationRouter;
