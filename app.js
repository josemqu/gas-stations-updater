import express from "express";
import dotenv from "dotenv";
import connectToDatabase from "./src/config/database.js";
import routerAPI from "./src/routes/routes.js";
import morgan from "morgan";
import cors from "./src/middlewares/cors.js";

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
