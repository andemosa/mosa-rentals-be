import { Brand, IBrand } from "../models/brand.model";

export async function createBrand(input: IBrand) {
  try {
    const newBrand = await Brand.create(input);
    return newBrand;
  } catch (error: any) {
    throw new Error(error);
  }
}

// to initially populate db
export async function saveBrand(name: string) {
  try {
    await Brand.updateOne(
      {
        name,
      },
      {
        name,
      },
      {
        upsert: true,
      }
    );
  } catch (err: any) {
    throw new Error(err);
  }
}
