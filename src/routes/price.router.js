import { Router } from "express";
import { getPrices, convertPrices } from "../controllers/price.controller.js";

const PriceRouter = Router();

PriceRouter.get("/", getPrices);
PriceRouter.get("/stations/", convertPrices);

export default PriceRouter;
