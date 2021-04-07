import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

class CreateCarsSpecificationController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const { specificationsId } = request.body;

    const createCarSpecificationUseCase = container.resolve(
      CreateCarSpecificationUseCase
    );

    const cars = await createCarSpecificationUseCase.execute({
      carId: id,
      specificationsId,
    });

    return response.json(cars).send();
  }
}

export { CreateCarsSpecificationController };
