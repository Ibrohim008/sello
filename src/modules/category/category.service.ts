import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryRepository } from './category.repository';
import { ResData } from 'src/lib/resData';
import { ID } from 'src/common/types/type';
import { CategoryNotFoundException } from './exception/category.exception';

@Injectable()
export class CategoryService {
  constructor(
    @Inject('ICategoryRepository')
    private readonly repository: CategoryRepository,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const category = await this.repository.create(createCategoryDto);

    const resData = new ResData(
      'Created Successfully',
      HttpStatus.CREATED,
      category,
    );

    return resData;
  }

  async findAll() {
    return await this.repository.findAll();
  }

  async findOne(id: number) {
    return await this.repository.findOneById(id);
  }

  async update(id: ID, updateCategoryDto: UpdateCategoryDto) {
    const foundCategory = await this.findOne(id);

    if (!foundCategory) {
      throw new CategoryNotFoundException();
    }

    const updatedCategory = Object.assign(foundCategory, updateCategoryDto);

    const data = await this.repository.update(updatedCategory);

    const resData = new ResData('Updated Category', HttpStatus.OK, data);

    return resData;
  }

  async remove(id: number) {
    const foundCategory = await this.findOne(id);

    if (!foundCategory) {
      throw new CategoryNotFoundException();
    }

    const data = await this.repository.delete(foundCategory);

    const resData = new ResData('Category deleted', HttpStatus.OK, data);

    return resData;
  }
}
