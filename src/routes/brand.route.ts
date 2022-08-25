import express from "express";
import { createBrandHandler } from "../controllers/brand.controller";

const router = express.Router();

router.post("/", createBrandHandler);

export default router;
