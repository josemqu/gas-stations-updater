import { Router } from "express";

import {
  getGasStations,
  getGasStation,
  createGasStation,
  createGasStations,
  updateGasStations,
  deleteGasStation,
} from "../controllers/gas.station.controller.js";

const GasStationRouter = Router();

GasStationRouter.get("/", getGasStations);
GasStationRouter.get("/:id", getGasStation);
GasStationRouter.post("/", createGasStation);
GasStationRouter.post("/upload-all/", createGasStations);
GasStationRouter.put("/update/", updateGasStations);
GasStationRouter.delete("/:id", deleteGasStation);

export default GasStationRouter;
