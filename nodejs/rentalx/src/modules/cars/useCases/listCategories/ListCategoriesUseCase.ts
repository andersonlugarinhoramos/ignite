import { Category } from "../../model/Category";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

class ListCategoriesUseCase {
  constructor(private categoriresRepository: ICategoriesRepository) {}

  execute(): Category[] {
    const categories = this.categoriresRepository.list();

    return categories;
  }
}

export { ListCategoriesUseCase };
