import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car Specification", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory
    );
  });

  it("Should not be able to add a new specification to a now-existent car", async () => {
    expect(async () => {
      const carId = "12334";
      const specificatonsId = ["54321"];

      await createCarSpecificationUseCase.execute({ carId, specificatonsId });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should be able to add a new specification to the car", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Name Car",
      description: "Description Car",
      dailyRate: 100,
      licensePlate: "ABC-1234",
      fineAmount: 60,
      brand: "Brand",
      categoryId: "category",
    });

    const specificatonsId = ["54321"];

    await createCarSpecificationUseCase.execute({
      carId: car.id,
      specificatonsId,
    });
  });
});
