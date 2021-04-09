import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";

import { IRentalsRepository } from "../IRentalsRepository";

class RentalsRepositoryInMemory implements IRentalsRepository {
  rentals: Rental[] = [];

  async findOpenRentalByCar(carId: string): Promise<Rental> {
    return this.rentals.find(
      (rental) => rental.carId === carId && !rental.endDate
    );
  }
  async findByOpenRentalByUser(userId: string): Promise<Rental> {
    return this.rentals.find(
      (rental) => rental.userId === userId && !rental.endDate
    );
  }

  async create({
    carId,
    expectedReturnDate,
    userId,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = new Rental();

    Object.assign(rental, {
      carId,
      expectedReturnDate,
      userId,
      startDate: new Date(),
    });

    this.rentals.push(rental);

    return rental;
  }
}

export { RentalsRepositoryInMemory };
