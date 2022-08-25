import { saveBrand } from "../services/brand.service";

const brandList = ["Sport", "SUV", "MPV", "Sedan", "Coupe", "Hatchbank"];

export const seedDb = async () => {
  for (const brand of brandList) {
    const contents = await saveBrand(brand);
  }
};
