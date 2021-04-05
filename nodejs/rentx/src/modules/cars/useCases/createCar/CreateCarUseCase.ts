import { ICreateCarDTO } from "@modules/cars/dtos/ICreateUserDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { AppError } from "@shared/errors/AppError";

// @injectable()
class CreateCarUseCase {
  constructor(
    // @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {}
  async execute({
    name,
    description,
    dailyRat,
    licensePlate,
    fineAmount,
    brand,
    cagtegoryId,
  }: ICreateCarDTO): Promise<Car> {
    const carAlreadyExists = this.carsRepository.findByLicensePlate(
      licensePlate
    );

    if (carAlreadyExists) {
      throw new AppError("Car already exists!");
    }

    const car = await this.carsRepository.create({
      name,
      description,
      dailyRat,
      licensePlate,
      fineAmount,
      brand,
      cagtegoryId,
    });

    return car;
  }
}

export { CreateCarUseCase };
