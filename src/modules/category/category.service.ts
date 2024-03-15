import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryRepository } from './category.repository';
import { ResData } from 'src/lib/resData';
import { ID } from 'src/common/types/type';
import { CategoryNotFoundException } from './exception/category.exception';
import { ICategoryService } from './interfaces/category.service';
import { CategoryEntity } from './entities/category.entity';

@Injectable()
export class CategoryService implements ICategoryService {
  constructor(
    @Inject('ICategoryRepository')
    private readonly repository: CategoryRepository,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const entity = await this.repository.createEntity(createCategoryDto);
    const category = await this.repository.create(entity);

    const resData = new ResData(
      'Created successfully',
      HttpStatus.CREATED,
      category,
    );

    return resData;
  }

  async findAll() {
    const data = await this.repository.findAll();

    return new ResData('Found successfully', HttpStatus.OK, data);
  }

  async findOne(id: number) {
    const data = await this.repository.findOneById(id);

    if (!data) {
      throw new CategoryNotFoundException();
    }

    return new ResData('Found successfully', HttpStatus.OK, data);
  }

  async update(id: ID, updateCategoryDto: UpdateCategoryDto) {
    const { data: foundCategory } = await this.findOne(id);

    const entity = await this.repository.createEntity(updateCategoryDto);

    const updatedCategory = Object.assign(foundCategory, entity);

    const data = await this.repository.update(updatedCategory);

    const resData = new ResData('Updated successfully', HttpStatus.OK, data);

    return resData;
  }

  async remove(id: number): Promise<ResData<CategoryEntity>> {
    const { data: foundCategory } = await this.findOne(id);

    if (!foundCategory) {
      throw new CategoryNotFoundException();
    }

    const data = await this.repository.delete(foundCategory);

    const resData = new ResData('Deleted successfully', HttpStatus.OK, data);

    return resData;
  }
}
