import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateuserDTO";
import { IUsersRepository } from "../../repository/IUserRepository";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    email,
    name,
    password,
    driver_license,
  }: ICreateUserDTO): Promise<void> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError("use already exists");
    }

    const passwordHash = await hash(password, 8);

    await this.usersRepository.create({
      email,
      name,
      password: passwordHash,
      driver_license,
    });
  }
}

export { CreateUserUseCase };
