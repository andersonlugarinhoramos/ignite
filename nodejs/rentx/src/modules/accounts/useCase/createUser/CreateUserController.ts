import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateUserUseCase } from "./CreateUserCase";

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, name, username, password, driver_license } = request.body;

    const createUserUseCase = container.resolve(CreateUserUseCase);

    await createUserUseCase.execute({
      email,
      name,
      password,
      driver_license,
    });

    return response.status(201).send();
  }
}

export { CreateUserController };
