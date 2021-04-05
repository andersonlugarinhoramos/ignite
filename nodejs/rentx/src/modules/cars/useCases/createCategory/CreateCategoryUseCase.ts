import { inject, injectable } from "tsyringe";

import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriresRepository: ICategoriesRepository
  ) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const categoryAlreadyExists = await this.categoriresRepository.findByName(
      name
    );

    if (categoryAlreadyExists) {
      throw new AppError("Category Already exist");
    }

    this.categoriresRepository.create({ name, description });
  }
}

export { CreateCategoryUseCase };
