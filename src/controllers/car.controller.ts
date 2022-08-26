import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { Car } from "../models/car.model";

import { CreateCarInput } from "../schema/car.schema";
import {
  countCars,
  createCar,
  findCars,
  findPopularCars,
  findRecommendedCars,
} from "../services/car.service";

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

export async function getCarsHandler(_: Request, res: Response) {
  const cars = await findCars();

  return res.status(StatusCodes.OK).send(cars);
}

export async function getPopularCarsHandler(_: Request, res: Response) {
  const cars = await findPopularCars();

  return res.status(StatusCodes.OK).send(cars);
}

export async function getRecommendedCarsHandler(_: Request, res: Response) {
  const cars = await findRecommendedCars();
  const numCars = await countCars();

  return res.status(StatusCodes.OK).send({
    cars,
    numCars,
  });
}
