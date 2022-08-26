import express from "express";
import { getCarsHandler, getPopularCarsHandler, getRecommendedCarsHandler, uploadCarHandler } from "../controllers/car.controller";
import validate from "../middleware/validateResource";
import { createCarSchema } from "../schema/car.schema";

const router = express.Router();

router.post("/", validate(createCarSchema), uploadCarHandler);

router.get("/", getCarsHandler)

router.get("/popular", getPopularCarsHandler)

router.get("/recommended", getRecommendedCarsHandler)

export default router;
