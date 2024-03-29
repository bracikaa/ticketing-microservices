import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface UserPayload {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
  } catch (error) {
    if (!req.session?.jwt) {
      return next();
    }
  }

  try {
    const payload = jwt.verify(
      req.session!.jwt,
      process.env.JWT_KEY!
    ) as UserPayload;

    req.currentUser = payload;
  } catch (err) {}

  return next();
};
