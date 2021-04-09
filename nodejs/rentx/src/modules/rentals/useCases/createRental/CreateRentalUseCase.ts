import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { AppError } from "@shared/errors/AppError";

dayjs.extend(utc);

interface IRequest {
  userId: string;
  carId: string;
  expectedReturnDate: Date;
}

class CreateRentalUseCase {
  constructor(private rentalsRepository: IRentalsRepository) {}

  async execute({
    userId,
    carId,
    expectedReturnDate,
  }: IRequest): Promise<Rental> {
    const minimumHours = 24;
    const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(
      carId
    );

    if (carUnavailable) {
      throw new AppError("Car is unavailable");
    }

    const rentalOpenToUser = await this.rentalsRepository.findByOpenRentalByUser(
      userId
    );

    if (rentalOpenToUser) {
      throw new AppError("There´s a rental in progress for user!");
    }

    const dateNow = dayjs().utc().local().format();

    const expectReturnDateFormat = dayjs(expectedReturnDate)
      .utc()
      .local()
      .format();

    const compare = dayjs(expectReturnDateFormat).diff(dateNow, "hours");

    if (compare < minimumHours) {
      throw new AppError("Invalid return time!");
    }

    const rental = await this.rentalsRepository.create({
      userId,
      carId,
      expectedReturnDate,
    });

    return rental;
  }
}

export { CreateRentalUseCase };
