import dayjs from "dayjs";

import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;

describe("Create a Rental", () => {
  const dayAdd24Hours = dayjs().add(1, "day").toDate();
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory);
  });

  it("Should be able to create a new rental", async () => {
    const rental = await createRentalUseCase.execute({
      userId: "1234",
      carId: "",
      expectedReturnDate: dayAdd24Hours,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("startDate");
  });

  it("Should not be able to create a new rental if there is another open to the same user", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        userId: "1234",
        carId: "",
        expectedReturnDate: dayAdd24Hours,
      });

      await createRentalUseCase.execute({
        userId: "1234",
        carId: "",
        expectedReturnDate: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to create a new rental if there is another open to the same car", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        userId: "1234",
        carId: "test",
        expectedReturnDate: dayAdd24Hours,
      });

      await createRentalUseCase.execute({
        userId: "3421",
        carId: "test",
        expectedReturnDate: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to create a new rental with invalid return time", async () => {
    expect(async () => {
      const dayAdd23Hours = dayjs().add(23, "hours").toDate();

      await createRentalUseCase.execute({
        userId: "1234",
        carId: "test",
        expectedReturnDate: dayAdd23Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
