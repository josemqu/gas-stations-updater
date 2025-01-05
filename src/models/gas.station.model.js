import mongoose from "mongoose";

const { Schema } = mongoose;
const gasStationCollection = "stations2";

// Schema for Price History
const priceSchema = new Schema({
  // _id: { type: Schema.Types.ObjectId, auto: true },
  price: { type: Number, required: true },
  date: { type: Date, required: true, unique: true },
});

// Schema for Products
const productSchema = new Schema({
  // _id: { type: Schema.Types.ObjectId, auto: true },
  productId: { type: Number, required: true, unique: true },
  productName: { type: String, required: true },
  prices: [priceSchema], // Array of price histories
});

// Schema for Station
const gasStationSchema = new Schema(
  {
    _id: { type: Schema.Types.ObjectId, auto: true },
    stationId: { type: Number, required: true, unique: true },
    stationName: { type: String, required: true },
    address: { type: String, required: true },
    town: { type: String, required: true },
    province: { type: String, required: true },
    flag: { type: String, required: true },
    flagId: { type: Number, required: true },
    geometry: {
      type: {
        type: String, // Should always be "Point" for GeoJSON
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
      },
    },
    products: [productSchema], // Array of products
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Adding a GeoJSON 2dsphere index for geometry
gasStationSchema.index({ geometry: "2dsphere" });

export const gasStationModel = mongoose.model(
  gasStationCollection,
  gasStationSchema
);
