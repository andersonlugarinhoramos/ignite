import { inject, injectable } from "tsyringe";

import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";

@injectable()
class ListRentalByUserUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository
  ) {}

  async execute(userId: string): Promise<Rental[]> {
    const rentalsByUser = await this.rentalsRepository.findByUserId(userId);

    return rentalsByUser;
  }
}

export { ListRentalByUserUseCase };
