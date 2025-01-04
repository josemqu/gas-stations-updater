import mongoose from "mongoose";

const gasStationCollection = "stations2";

const gasStationSchema = new mongoose.Schema({
  stationId: Number,
  stationName: String,
  address: String,
  town: String,
  province: String,
  flag: String,
  flagId: Number,
  geometry: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
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

export const gasStationModel = mongoose.model(
  gasStationCollection,
  gasStationSchema
);
