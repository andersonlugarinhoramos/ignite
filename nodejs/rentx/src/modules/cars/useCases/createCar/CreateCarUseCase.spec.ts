import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepository: CarsRepositoryInMemory;

describe("Create Car", () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepository);
  });

  it("Should be able to create a new car", async () => {
    await createCarUseCase.execute({
      name: "Name Car",
      description: "Description Car",
      dailyRat: 100,
      licensePlate: "ABC-1234",
      fineAmount: 60,
      brand: "Brand",
      cagtegoryId: "category",
    });
  });

  it("Should not be able to create a car with exists license plate", () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: "Car1",
        description: "Description Car",
        dailyRat: 100,
        licensePlate: "ABC-1234",
        fineAmount: 60,
        brand: "Brand",
        cagtegoryId: "category",
      });

      await createCarUseCase.execute({
        name: "Car2",
        description: "Description Car",
        dailyRat: 100,
        licensePlate: "ABC-1234",
        fineAmount: 60,
        brand: "Brand",
        cagtegoryId: "category",
      });
    }).rejects.toBeInstanceOf(AppError);

    it("Should not be able to create a car with available true by default", async () => {
      const car = await createCarUseCase.execute({
        name: "Car1",
        description: "Description Car",
        dailyRat: 100,
        licensePlate: "ABC-1234",
        fineAmount: 60,
        brand: "Brand",
        cagtegoryId: "category",
      });

      expect(car.available).toBe(true);
    });
  });
});
