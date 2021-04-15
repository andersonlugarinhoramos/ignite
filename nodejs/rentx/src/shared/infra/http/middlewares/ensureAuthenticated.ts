import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import auth from "@config/auth";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { UsersTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokensRepository";
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
  const usersTokensRepository = new UsersTokensRepository();

  if (!authHeader) {
    throw new AppError("Token missing", 401);
  }

  const [, refreshToken] = authHeader.split(" ");

  try {
    const { sub: userId } = verify(
      refreshToken,
      auth.secretRefreshToken
    ) as IPayload;

    const user = usersTokensRepository.findByUserIdAndRefreshToken(
      userId,
      refreshToken
    );

    if (!user) {
      throw new AppError("User does not exists!", 401);
    }

    request.user = {
      userId,
    };

    next();
  } catch {
    throw new AppError("Invalid token!", 401);
  }
}
