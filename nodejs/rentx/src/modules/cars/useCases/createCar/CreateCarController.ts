import { Request, Response } from "express";
import { container } from "tsyringe";

import { CarsRepository } from "@modules/cars/infra/repositories/CarsRepository";

class CreateCarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      name,
      description,
      dailyRate,
      licensePlate,
      fineAmount,
      brand,
      categoryId,
    } = request.body;

    const createCarUseCase = container.resolve(CarsRepository);

    const car = await createCarUseCase.create({
      name,
      description,
      dailyRate,
      licensePlate,
      fineAmount,
      brand,
      categoryId,
    });

    return response.status(201).json(car);
  }
}

export { CreateCarController };
