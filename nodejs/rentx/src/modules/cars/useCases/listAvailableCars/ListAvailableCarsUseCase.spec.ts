import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars,", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );
  });

  it("Should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car1",
      description: "Car description",
      dailyRate: 100.0,
      licensePlate: "AAA-1234",
      fineAmount: 50,
      brand: "CarBrand",
      categoryId: "categoryId",
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("Should be able to list all available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car1",
      description: "Car description",
      dailyRate: 100.0,
      licensePlate: "AAA-1234",
      fineAmount: 50,
      brand: "CarBrandTest",
      categoryId: "categoryId",
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: "CarBrandTest",
    });

    expect(cars).toEqual([car]);
  });

  it("Should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car3",
      description: "Car description",
      dailyRate: 100.0,
      licensePlate: "AAA-1234",
      fineAmount: 50,
      brand: "CarBrandTest",
      categoryId: "categoryId",
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: "Car3",
    });

    expect(cars).toEqual([car]);
  });

  it("Should be able to list all available cars by category", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car1",
      description: "Car description",
      dailyRate: 100.0,
      licensePlate: "AAA-1234",
      fineAmount: 50,
      brand: "CarBrandTest",
      categoryId: "12345",
    });

    const cars = await listAvailableCarsUseCase.execute({
      categoryId: "12345",
    });

    expect(cars).toEqual([car]);
  });
});
