import { Router } from "express";
import gasStationRouter from "./gas.station.router.js";
import priceRouter from "./price.router.js";

const routerAPI = (app) => {
  const router = Router();
  app.use("/api/v1", router);
  router.use("/gas-stations", gasStationRouter);
  router.use("/prices", priceRouter);
};

export default routerAPI;
