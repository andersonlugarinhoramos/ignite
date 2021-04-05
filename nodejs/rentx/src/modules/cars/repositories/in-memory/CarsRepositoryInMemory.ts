import { ICreateCarDTO } from "@modules/cars/dtos/ICreateUserDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";

import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];

  async create({
    brand,
    cagtegoryId,
    dailyRat,
    description,
    fineAmount,
    licensePlate,
    name,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      brand,
      cagtegoryId,
      dailyRat,
      description,
      fineAmount,
      licensePlate,
      name,
    });

    this.cars.push(car);

    return car;
  }

  async findByLicensePlate(licensePlate: string): Promise<Car> {
    return this.cars.find((car) => car.licensePlate === licensePlate);
  }
}

export { CarsRepositoryInMemory };
