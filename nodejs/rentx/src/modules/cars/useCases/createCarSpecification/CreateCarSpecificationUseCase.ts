import { inject } from "tsyringe";

import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  carId: string;
  specificatonsId: string[];
}

class CreateCarSpecificationUseCase {
  constructor(
    // @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {}

  async execute({ carId, specificatonsId }: IRequest): Promise<void> {
    const carExists = this.carsRepository.findById(carId);

    if (!carExists) {
      throw new AppError("Car does not exists!");
    }
  }
}

export { CreateCarSpecificationUseCase };
