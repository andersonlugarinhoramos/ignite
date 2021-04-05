import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateUserUseCase } from "./CreateUserCase";

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, name, username, password, driverLicense } = request.body;

    const createUserUseCase = container.resolve(CreateUserUseCase);

    await createUserUseCase.execute({
      email,
      name,
      password,
      driverLicense,
    });

    return response.status(201).send();
  }
}

export { CreateUserController };
