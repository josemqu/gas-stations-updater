import axios from "axios";
import { gasStationModel } from "../models/gas.station.model.js";
import mongoose from "mongoose";
import config from "../config/config.js";

export default class GasStationRepository {
  async getAll() {
    // sort id desc
    return await gasStationModel
      .find()
      .sort({
        id: -1,
      })
      .collation({ locale: "en_US", numericOrdering: true })
      .limit(15)
      .lean();
  }

  async getAllLocalStations() {
    const stations = await axios
      .get("http://127.0.0.1:3000/stations.json")
      .then((response) => response.data)
      .catch((error) => console.error(error));
    console.log(stations.length);
    return stations;
  }

  async getById(id) {
    return await gasStationModel.findById(id);
  }

  async create(gasStation) {
    return await gasStationModel.create(gasStation);
  }

  async update(stations) {
    console.log(stations);

    try {
      // Insert or update to the database
      for (const station of stations) {
        for (const product of station.products) {
          // Verificar si el producto ya existe
          const existingProduct = await gasStationModel.findOne(
            {
              stationId: station.stationId,
              "products.productId": product.productId,
            },
            { "products.$": 1 }
          );

          if (existingProduct) {
            // Verificar si el precio ya existe
            const prices = existingProduct.products[0].prices;
            const priceExists = prices.some(
              (price) =>
                price.price === product.prices[0].price &&
                new Date(price.date).getTime() ===
                  new Date(product.prices[0].date).getTime()
            );

            if (!priceExists) {
              // Agregar nuevo precio si no existe
              await gasStationModel.updateOne(
                {
                  stationId: station.stationId,
                  "products.productId": product.productId,
                },
                {
                  $push: {
                    "products.$.prices": {
                      _id: new mongoose.Types.ObjectId(),
                      price: product.prices[0].price,
                      date: product.prices[0].date,
                    },
                  },
                }
              );
            }
          } else {
            // Si el producto no existe, agregarlo a la estación
            await gasStationModel.updateOne(
              { stationId: station.stationId },
              {
                $push: {
                  products: {
                    _id: new mongoose.Types.ObjectId(),
                    productId: product.productId,
                    productName: product.productName,
                    prices: [
                      {
                        _id: new mongoose.Types.ObjectId(),
                        price: product.prices[0].price,
                        date: product.prices[0].date,
                      },
                    ],
                  },
                },
              },
              { upsert: true }
            );
          }
        }

        // Si la estación no existe, crearla con todos los productos
        await gasStationModel.updateOne(
          { stationId: station.stationId },
          { $setOnInsert: station },
          { upsert: true }
        );
      }

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async getIdByPropertyId(id) {
    const response = await gasStationModel.find({ id: id });
    return response[0]._id;
  }

  async delete(id) {
    return await gasStationModel.findByIdAndDelete(id);
  }
}
