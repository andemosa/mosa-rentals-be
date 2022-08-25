import express from "express";
import { createUserHandler } from "../controllers/user.controller";
import validate from "../middleware/validateResource";
import { createUserSchema } from "../schema/user.schema";

const router = express.Router();

router.post("/", validate(createUserSchema), createUserHandler);

export default router;
