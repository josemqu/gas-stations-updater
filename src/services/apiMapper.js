import mongoose from "mongoose";

/**
 * Transforma los datos obtenidos de la API al formato esperado por MongoDB.
 * @param {Array} apiData - Datos obtenidos de la API.
 * @returns {Array} - Datos transformados listos para ser insertados o actualizados en MongoDB.
 */
export const mapApiToMongoModel = (apiData) => {
  const stationsMap = {};

  apiData.forEach((item) => {
    // Si la estación no existe en el mapa, inicializamos su estructura
    if (!stationsMap[item.idempresa]) {
      stationsMap[item.idempresa] = {
        stationId: item.idempresa,
        stationName: item.empresa,
        address: item.direccion,
        town: item.localidad,
        province: item.provincia || "N/A", // Provincia no siempre está disponible
        flag: item.empresabandera,
        flagId: item.idempresabandera,
        geometry: {
          type: "Point",
          coordinates: [parseFloat(item.longitud), parseFloat(item.latitud)],
        },
        products: [],
      };
    }

    // Referencia a la estación actual
    const station = stationsMap[item.idempresa];

    // Verificamos si el producto ya existe en la estación
    const existingProduct = station.products.find(
      (p) => p.productId === item.idproducto
    );

    if (!existingProduct) {
      // Si el producto no existe, lo añadimos
      station.products.push({
        _id: new mongoose.Types.ObjectId(),
        productId: item.idproducto,
        productName: item.producto,
        prices: [
          {
            _id: new mongoose.Types.ObjectId(),
            price: parseFloat(item.precio),
            date: new Date(item.fecha_vigencia),
          },
        ],
      });
    } else {
      // Si el producto ya existe, añadimos el nuevo precio al historial
      existingProduct.prices.push({
        _id: new mongoose.Types.ObjectId(),
        price: parseFloat(item.precio),
        date: new Date(item.fecha_vigencia),
      });
    }
  });

  // Convertimos el objeto stationsMap a un arreglo
  return Object.values(stationsMap);
};
