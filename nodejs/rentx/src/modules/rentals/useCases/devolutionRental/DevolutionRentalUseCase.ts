import { inject, injectable } from "tsyringe";

import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  id: string;
  userId: string;
}

@injectable()
class DevolutionRentalUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,
    @inject("CarsRepository")
    private carsRepository: ICarsRepository,
    @inject("DateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute({ id, userId }: IRequest): Promise<Rental> {
    const rental = await this.rentalsRepository.findById(id);

    if (!rental) {
      throw new AppError("Retnal does not exists!");
    }

    const car = await this.carsRepository.findById(rental.carId);
    const minimumDaily = 1;

    const dateNow = this.dateProvider.dateNow();

    let daily = this.dateProvider.compareInDays(rental.startDate, dateNow);

    if (daily <= 0) {
      daily = minimumDaily;
    }

    const delay = this.dateProvider.compareInDays(
      dateNow,
      rental.expectedReturnDate
    );

    let total = 0;

    if (delay > 0) {
      const calculateFine = delay + car.fineAmount;
      total = calculateFine;
    }

    total += daily * car.dailyRate;

    rental.endDate = dateNow;
    rental.total = total;

    await this.rentalsRepository.create(rental);
    await this.carsRepository.updateAvailable(car.id, true);

    return rental;
  }
}

export { DevolutionRentalUseCase };
