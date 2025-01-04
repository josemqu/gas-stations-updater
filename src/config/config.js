import dotenv from "dotenv";
dotenv.config();

const config = {
  PORT: process.env.PORT,
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_PASS: process.env.DB_PASS,
  DB_URL: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@codercluster.tgft5r9.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
  PRICES_ENDPOINT: process.env.PRICES_ENDPOINT,
};

export default config;
