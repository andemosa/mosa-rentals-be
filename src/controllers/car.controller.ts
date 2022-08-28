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
  const cars = findCars();
  const numCars = countCars();

  const result = await Promise.all([cars, numCars]);

  return res.status(StatusCodes.OK).send({
    cars: result[0],
    numCars: result[1],
  });
}

export async function getPopularCarsHandler(_: Request, res: Response) {
  const cars = await findPopularCars();

  return res.status(StatusCodes.OK).send(cars);
}

export async function getRecommendedCarsHandler(_: Request, res: Response) {
  const cars = findRecommendedCars();
  const numCars = countCars();

  const result = await Promise.all([cars, numCars]);

  return res.status(StatusCodes.OK).send({
    cars: result[0],
    numCars: result[1],
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
    const brands = findDistinctBrand();
    const capacities = findDistinctCapacity();
    const maxPrice = findHighestPrice();

    const result = await Promise.all([brands, capacities, maxPrice]);

    res.send({
      brands: result[0],
      capacities: result[1],
      maxPrice: result[2],
    });
  } catch (error) {
    next(error);
  }
}
