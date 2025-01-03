import PricesRepository from "../repositories/prices.repository.js";
import GasTenderRepository from "./gas.station.repository.js";

export const pricesRepository = new PricesRepository();
export const gasTenderRepository = new GasTenderRepository();
