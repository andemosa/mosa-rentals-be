import { NextFunction, Request, Response } from "express";
import { CreateUserInput } from "../schema/user.schema";
import { createUser } from "../services/user.service";


export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput["body"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const newUser = await createUser(req.body);
    return res.send(newUser);
  } catch (error) {
    next(error);
  }
}
