import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { CreateCarInput } from "../schema/car.schema";
import {
  countCars,
  createCar,
  findCar,
  findCars,
  findDistinctBrand,
  findDistinctCapacity,
  findHighestPrice,
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

export async function getCarHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { carId } = req.params;

  try {
    const car = await findCar(carId);

    return res.send(car);
  } catch (error) {
    next(error);
  }
}

export async function getOptionsHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const brands = await findDistinctBrand();
    const capacities = await findDistinctCapacity();
    const maxPrice = await findHighestPrice()

    res.send({
      brands,
      capacities,
      maxPrice
    });
  } catch (error) {
    next(error);
  }
}
