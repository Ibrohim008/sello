import { ID } from 'src/common/types/type';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { CategoryEntity } from '../entities/category.entity';

export interface ICategoryRepository {
  create(createCcatgoryDto: CreateCategoryDto): Promise<CategoryEntity>;
  createEntity(
    dto: CreateCategoryDto | UpdateCategoryDto,
  ): Promise<CategoryEntity>;
  findAll(): Promise<Array<CategoryEntity>>;
  update(updateCategoryDto: UpdateCategoryDto): Promise<CategoryEntity>;
  findOneById(id: ID): Promise<CategoryEntity>;
  findOneByName(name: string): Promise<Array<CategoryEntity>>;
  delete(dto: CategoryEntity): Promise<CategoryEntity>;
}
