import express from "express";
import { uploadCarHandler } from "../controllers/car.controller";
import validate from "../middleware/validateResource";
import { createCarSchema } from "../schema/car.schema";

const router = express.Router();

router.post("/", validate(createCarSchema), uploadCarHandler);

export default router;
