import { NextFunction, Request, Response } from "express";
import { Car } from "../models/car.model";
import { CreateCarInput } from "../schema/car.schema";
import { createCar } from "../services/car.service";

export async function uploadCarHandler(
  req: Request<{}, {}, CreateCarInput["body"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const newCar = await createCar(req.body);
    return res.send(newCar);
  } catch (error) {
    next(error);
  }
}
