import express from "express";
import dotenv from "dotenv";
import connectToDatabase from "./config/database.js";
import routerAPI from "./routes/routes.js";
import morgan from "morgan";
import cors from "./middlewares/cors.js";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const app = express();
app.use(
  express.json({
    type: ["application/json", "text/plain"],
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(cors);
app.use(morgan("dev"));
app.use("/", express.static(`${__dirname}/public`));

// Routes config
routerAPI(app);

// Connect to the database and start the app
connectToDatabase().then(() => {
  // Start the Express server
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
