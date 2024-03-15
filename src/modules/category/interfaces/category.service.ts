import { ResData } from 'src/lib/resData';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { CategoryEntity } from '../entities/category.entity';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { ID } from 'src/common/types/type';

export interface ICategoryService {
  create(
    createCategoryDto: CreateCategoryDto,
  ): Promise<ResData<CategoryEntity>>;
  update(
    id: ID,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<ResData<CategoryEntity>>;

  findOne(id: ID): Promise<ResData<CategoryEntity>>;

  findAll(): Promise<ResData<Array<CategoryEntity>>>;
  remove(id: ID): Promise<ResData<CategoryEntity>>;
}
