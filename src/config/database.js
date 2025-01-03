import mongoose from "mongoose";
import config from "./config.js";

const { DB_USER, DB_PASS, DB_NAME } = config;

const databaseURI = `mongodb+srv://${DB_USER}:${DB_PASS}@codercluster.tgft5r9.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);

const connectToDatabase = async () => {
  try {
    await mongoose.connect(databaseURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    process.exit(1);
  }
};

export default connectToDatabase;
