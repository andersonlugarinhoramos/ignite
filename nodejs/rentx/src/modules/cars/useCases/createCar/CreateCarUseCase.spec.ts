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
    const car = await createCarUseCase.execute({
      name: "New Car",
      description: "Description Car",
      dailyRate: 100,
      licensePlate: "ABC-0000",
      fineAmount: 60,
      brand: "Brand",
      categoryId: "category",
    });

    expect(car).toHaveProperty("id");
  });

  it("Should not be able to create a car with exists license plate", async () => {
    await createCarUseCase.execute({
      name: "Car1",
      description: "Description Car",
      dailyRate: 100,
      licensePlate: "ABC-1234",
      fineAmount: 60,
      brand: "Brand",
      categoryId: "category",
    });

    await expect(
      createCarUseCase.execute({
        name: "Car2",
        description: "Description Car",
        dailyRate: 100,
        licensePlate: "ABC-1234",
        fineAmount: 60,
        brand: "Brand",
        categoryId: "category",
      })
    ).rejects.toEqual(new AppError("Car already exists!"));
  });

  it("Should not be able to create a car with available true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Car3",
      description: "Description Car",
      dailyRate: 100,
      licensePlate: "ABC-9999",
      fineAmount: 60,
      brand: "Brand",
      categoryId: "category",
    });

    expect(car.available).toBe(true);
  });
});
