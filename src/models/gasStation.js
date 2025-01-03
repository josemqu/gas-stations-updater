import mongoose from "mongoose";

const gasStationSchema = new mongoose.Schema({
  stationId: Number,
  stationName: String,
  address: String,
  town: String,
  province: String,
  flag: String,
  flagId: Number,
  geometry: {
    type: String,
    coordinates: [Number],
  },
  products: [
    {
      productId: Number,
      productName: String,
      prices: [
        {
          price: Number,
          date: Date,
        },
      ],
    },
  ],
});

const GasStation = mongoose.model("GasStation", gasStationSchema);

export default GasStation;
