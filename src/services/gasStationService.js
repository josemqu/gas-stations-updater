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
        { stationId: gasStationData.stationId },
        {
          $set: gasStationData,
          $addToSet: {
            "products.$[elem].prices": gasStationData.products[0].prices[0],
          },
        },
        {
          upsert: true,
          new: true,
          arrayFilters: [
            { "elem.productId": gasStationData.products[0].productId },
          ],
        }
      );
    }

    console.log(`Updated data for station ID: ${stationId}`);
  } catch (error) {
    console.error(`Error updating data for station ID: ${stationId}`, error);
  }
}

export { updateGasStationData };
