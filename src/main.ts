import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"
require('dotenv').config();

import { connectToDatabase, disconnectFromDatabase } from "./utils/database";
import logger from "./utils/logger";
import carRouter from "./routes/car.route";
import brandRouter from "./routes/brand.route";
import userRouter from "./routes/user.route";
import { errorHandler } from "./middleware/errorhandler";
import { invalidRouteHandler } from "./middleware/norouteHandler";
import { seedDb } from "./utils/seedBrand";
import { seedCar } from "./utils/seedDb";

const PORT = process.env.PORT || 4000;

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors());

app.use("/api/cars", carRouter);
app.use("/api/brands", brandRouter);
app.use("/api/users", userRouter);

app.use(errorHandler);

//If no route is matched by now, it must be a 404
app.use(invalidRouteHandler);

const server = app.listen(PORT, async () => {
  await connectToDatabase();
  // await seedDb();
  // await seedCar();
  logger.info(`Server listening at http://localhost:${PORT}`);
});

const signals = ["SIGTERM", "SIGINT"];

function gracefulShutdown(signal: string) {
  process.on(signal, async () => {
    logger.info("Goodbye, got signal", signal);
    server.close();

    // disconnect from the db
    await disconnectFromDatabase();

    logger.info("My work here is done");

    process.exit(0);
  });
}

for (let i = 0; i < signals.length; i++) {
  gracefulShutdown(signals[i]);
}
