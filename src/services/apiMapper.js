/**
 * Transforma los datos obtenidos de la API al formato esperado por MongoDB.
 * @param {Array} apiData - Datos obtenidos de la API.
 * @returns {Array} - Datos transformados para insertar en MongoDB.
 */
export const mapApiToMongoModel = (apiData) => {
  const estacionesMap = {};

  apiData.forEach((item) => {
    if (!estacionesMap[item.idempresa]) {
      estacionesMap[item.idempresa] = {
        _id: item.idempresa,
        empresa: item.empresa,
        empresabandera: item.empresabandera,
        idempresabandera: item.idempresabandera,
        direccion: item.direccion,
        localidad: item.localidad,
        ubicacion: {
          latitud: item.latitud,
          longitud: item.longitud,
        },
        precios: [],
      };
    }

    const estacion = estacionesMap[item.idempresa];
    const producto = estacion.precios.find(
      (p) => p.idproducto === item.idproducto
    );

    if (!producto) {
      estacion.precios.push({
        producto: item.producto,
        idproducto: item.idproducto,
        historial: [
          { precio: item.precio, fecha_vigencia: item.fecha_vigencia },
        ],
      });
    } else {
      producto.historial.push({
        precio: item.precio,
        fecha_vigencia: item.fecha_vigencia,
      });
    }
  });

  return Object.values(estacionesMap);
};
