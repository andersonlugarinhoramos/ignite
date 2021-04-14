import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListRentalByUserUseCase } from "./ListRentalsByUserUseCase";

class ListRentalByUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { userId } = request.user;

    const listRentalByUserUseCase = container.resolve(ListRentalByUserUseCase);

    const listRentals = await listRentalByUserUseCase.execute(userId);

    return response.json(listRentals);
  }
}

export { ListRentalByUserController };
