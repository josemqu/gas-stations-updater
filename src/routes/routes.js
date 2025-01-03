import { Router } from "express";
import gasTenderRouter from "./gas.station.router.js";

const routerAPI = (app) => {
  const router = Router();
  app.use("/api/v1", router);
  app.use("/", viewsRouter);
  router.use("/gas-stations", gasTenderRouter);
};

export default routerAPI;
