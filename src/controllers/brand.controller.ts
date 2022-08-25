import { NextFunction, Request, Response } from "express";
import { createBrand } from "../services/brand.service";

export async function createBrandHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const newBrand = await createBrand(req.body);
    return res.send(newBrand);
  } catch (error) {
    next(error);
  }
}
