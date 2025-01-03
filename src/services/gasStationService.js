import axios from "axios";
import GasStation from "../models/gasStation.js";

async function updateGasStationData(stationId) {
  try {
    const response = await axios.get(
      `http://datos.energia.gob.ar/api/3/action/datastore_search?resource_id=80ac25de-a44a-4445-9215-090cf55cfda5&filters={"idtipohorario":2,"idempresa":${stationId}}&limit=10&offset=0`
    );

    const records = response.data.result.records;

    for (const record of records) {
      const gasStationData = {
        stationId: record.idempresa,
        stationName: record.empresa,
        address: record.direccion,
        town: record.localidad,
        province: record.provincia,
        flag: record.empresabandera,
        flagId: record.idempresabandera,
        geometry: {
          type: "Point",
          coordinates: [record.longitud, record.latitud],
        },
        products: [
          {
            productId: record.idproducto,
            productName: record.producto,
            prices: [
              {
                price: record.precio,
                date: new Date(record.fecha_vigencia),
              },
            ],
          },
        ],
      };

      await GasStation.findOneAndUpdate(
        {
          stationId: gasStationData.stationId,
          "products.productId": gasStationData.products[0].productId,
        },
        {
          $set: {
            "products.$.prices": gasStationData.products[0].prices,
            stationName: gasStationData.stationName,
            address: gasStationData.address,
            town: gasStationData.town,
            province: gasStationData.province,
            flag: gasStationData.flag,
            flagId: gasStationData.flagId,
            geometry: gasStationData.geometry,
          },
        },
        { upsert: true, new: true }
      );
    }

    console.log(`Updated data for station ID: ${stationId}`);
  } catch (error) {
    console.error(`Error updating data for station ID: ${stationId}`, error);
  }
}

async function addPriceToGasStation(stationId, productId, price, date) {
  try {
    await GasStation.findOneAndUpdate(
      {
        stationId,
        "products.productId": productId,
      },
      {
        $push: {
          "products.$.prices": {
            price,
            date,
          },
        },
      }
    );
  } catch (error) {
    console.error(`Error adding price to gas station ID: ${stationId}`, error);
  }
}

async function updateAllGasStationData() {
  const stationIds = [108, 109, 110]; // Replace with your desired station IDs

  for (const stationId of stationIds) {
    await updateGasStationData(stationId);
  }
}

export { updateGasStationData, addPriceToGasStation, updateAllGasStationData };
