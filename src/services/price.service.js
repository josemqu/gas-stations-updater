import axios from "axios";
import config from "../config/config.js";
import { mapApiToMongoModel } from "./apiMapper.js";

class PriceService {
  constructor() {}

  async getPrices() {
    const endpoint = config.PRICES_ENDPOINT;
    const response = await axios.get(endpoint);
    const prices = response.data.result;
    return prices;
  }

  async convertPrices() {
    const apiResponse = await this.getPrices();
    const prices = apiResponse.records;
    const stations = mapApiToMongoModel(prices);
    return stations;
  }
}

export default PriceService;
