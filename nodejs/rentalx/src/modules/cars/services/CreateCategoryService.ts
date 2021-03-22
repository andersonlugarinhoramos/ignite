import { ICategoriesRepository } from "../repositories/ICategoriesRepository";

interface IRequest {
  name: string;
  description: string;
}

class CreateCategoryService {
  constructor(private categoriresRepository: ICategoriesRepository) {}

  execute({ name, description }: IRequest): void {
    const categoryAlreadyExists = this.categoriresRepository.findByName(name);

    if (categoryAlreadyExists) {
      throw new Error("Category Already exist");
    }

    this.categoriresRepository.create({ name, description });
  }
}

export { CreateCategoryService };
