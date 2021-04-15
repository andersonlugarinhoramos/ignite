import dayjs from "dayjs";

import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dayjsProvider: DayjsDateProvider;

describe("Create a Rental", () => {
  const dayAdd24Hours = dayjs().add(1, "day").toDate();
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dayjsProvider = new DayjsDateProvider();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayjsProvider,
      carsRepositoryInMemory
    );
  });

  it("Should be able to create a new rental", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Test",
      description: "Car Test",
      dailyRate: 100,
      licensePlate: "AAA-0000",
      fineAmount: 40,
      brand: "brand",
      categoryId: "1234",
    });

    const rental = await createRentalUseCase.execute({
      userId: "1234",
      carId: car.id,
      expectedReturnDate: dayAdd24Hours,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("startDate");
  });

  it("Should not be able to create a new rental if there is another open to the same user", async () => {
    await rentalsRepositoryInMemory.create({
      carId: "test1",
      expectedReturnDate: dayAdd24Hours,
      userId: "1234",
    });

    await expect(
      createRentalUseCase.execute({
        userId: "1234",
        carId: "test2",
        expectedReturnDate: dayAdd24Hours,
      })
    ).rejects.toEqual(new AppError("There´s a rental in progress for user!"));
  });

  it("Should not be able to create a new rental if there is another open to the same car", async () => {
    await rentalsRepositoryInMemory.create({
      carId: "test",
      expectedReturnDate: dayAdd24Hours,
      userId: "1234",
    });

    await expect(
      createRentalUseCase.execute({
        userId: "3421",
        carId: "test",
        expectedReturnDate: dayAdd24Hours,
      })
    ).rejects.toEqual(new AppError("Car is unavailable"));
  });

  it("Should not be able to create a new rental with invalid return time", async () => {
    const dayAdd23Hours = dayjs().add(23, "hours").toDate();

    expect(
      createRentalUseCase.execute({
        userId: "1234",
        carId: "test",
        expectedReturnDate: dayAdd23Hours,
      })
    ).rejects.toEqual(new AppError("Invalid return time!"));
  });
});
