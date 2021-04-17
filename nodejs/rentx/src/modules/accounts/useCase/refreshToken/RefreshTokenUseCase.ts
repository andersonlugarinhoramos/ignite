import { sign, verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import auth from "@config/auth";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IPayload {
  sub: string;
  email: string;
}

interface ITokenResponse {
  token: string;
  refreshToken: string;
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute(refreshToken: string): Promise<ITokenResponse> {
    const { email, sub } = verify(
      refreshToken,
      auth.secretRefreshToken
    ) as IPayload;

    const {
      secretRefreshToken,
      expiresRefreshToken,
      expiresRefreshTokenDays,
    } = auth;

    const userId = sub;

    const userToken = await this.usersTokensRepository.findByUserIdAndRefreshToken(
      userId,
      refreshToken
    );

    if (!userToken) {
      throw new AppError("Refresh Token does not exists!");
    }

    await this.usersTokensRepository.deleteById(userToken.id);

    const newRefreshToken = sign({ email }, secretRefreshToken, {
      subject: sub,
      expiresIn: expiresRefreshToken,
    });

    const expiresDate = this.dateProvider.addDays(expiresRefreshTokenDays);

    await this.usersTokensRepository.create({
      expiresDate,
      refreshToken,
      userId,
    });

    const token = sign({}, auth.secretToken, {
      subject: userId,
      expiresIn: auth.expiresInToken,
    });

    return {
      token,
      refreshToken: newRefreshToken,
    };
  }
}

export { RefreshTokenUseCase };
