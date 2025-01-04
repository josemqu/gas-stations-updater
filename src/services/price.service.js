import axios from "axios";
import config from "../config/config.js";

class PriceService {
  constructor() {}

  async getPrices() {
    const endpoint = config.PRICES_ENDPOINT;
    const response = await axios.get(endpoint);
    const prices = response.data.result;
    return prices;
  }
}

export default PriceService;
