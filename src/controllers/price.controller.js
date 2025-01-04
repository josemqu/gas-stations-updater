import { priceService } from "../services/index.js";

export async function getPrices(req, res) {
  try {
    const prices = await priceService.getPrices();
    return res.status(200).json({
      ok: true,
      result: "Prices found successfully",
      payload: prices,
    });
  } catch (error) {
    return res.status(500).send({
      ok: false,
      result: "Prices not found",
      message: error.message,
    });
  }
}
