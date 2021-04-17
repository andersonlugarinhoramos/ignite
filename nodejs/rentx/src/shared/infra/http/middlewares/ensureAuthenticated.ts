import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import auth from "@config/auth";
import { AppError } from "@shared/errors/AppError";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token missing", 401);
  }

  const [, refreshToken] = authHeader.split(" ");

  try {
    const { sub: userId } = verify(refreshToken, auth.secretToken) as IPayload;

    request.user = {
      userId,
    };

    next();
  } catch {
    throw new AppError("Invalid token!", 401);
  }
}
