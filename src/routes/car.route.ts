import express from "express";
import { getCarHandler, getCarsHandler, getOptionsHandler, getPopularCarsHandler, getRecommendedCarsHandler, searchCarsHandler, uploadCarHandler } from "../controllers/car.controller";
import validate from "../middleware/validateResource";
import { createCarSchema } from "../schema/car.schema";

const router = express.Router();

router.post("/", validate(createCarSchema), uploadCarHandler);

router.get("/", getCarsHandler)

router.post("/search", searchCarsHandler)

router.get("/popular", getPopularCarsHandler)

router.get("/recommended", getRecommendedCarsHandler)

router.get("/options", getOptionsHandler)

router.get("/:carId", getCarHandler)

export default router;
