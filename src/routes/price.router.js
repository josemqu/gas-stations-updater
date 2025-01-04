import { Router } from "express";
import { getPrices } from "../controllers/price.controller.js";

const PriceRouter = Router();

PriceRouter.get("/", getPrices);

export default PriceRouter;
