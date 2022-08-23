import { Car, ICar } from "../models/car.model";

export async function createCar(input: ICar) {
  try {
    const newCar = await Car.create(input);
    return newCar;
  } catch (error: any) {
    throw new Error(error);
  }
}
