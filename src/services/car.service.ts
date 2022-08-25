import { Brand } from "../models/brand.model";
import { Car, ICar } from "../models/car.model";

export async function createCar(input: ICar) {
  const brand = await Brand.findOne({
    name: input.brand,
  });

  if (!brand) {
    throw new Error('No matching brand found');
  }

  try {
    const newCar = await Car.create(input);
    return newCar;
  } catch (error: any) {
    throw new Error(error);
  }
}
