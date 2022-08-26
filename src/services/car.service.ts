import { Brand } from "../models/brand.model";
import { Car, ICar } from "../models/car.model";

export async function createCar(input: ICar) {
  const brand = await Brand.findOne({
    name: input.brand,
  });

  if (!brand) {
    throw new Error("No matching brand found");
  }

  try {
    const newCar = await Car.create(input);
    return newCar;
  } catch (error: any) {
    throw new Error(error);
  }
}

export function findCars() {
  return Car.find().lean();
}

export function findPopularCars() {
  return Car.find().sort("-likes").limit(4);
}

export function findRecommendedCars() {
  return Car.find().sort("-likes").skip(4).limit(8);
}

export function countCars() {
  return Car.countDocuments();
}
