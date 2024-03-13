import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ID } from 'src/common/types/type';
import { CategoryEntity } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

export class CategoryRepository {
  constructor(
    @InjectRepository(CategoryEntity)
    private repository: Repository<CategoryEntity>,
  ) {}

  async create(dto: CreateCategoryDto): Promise<CategoryEntity> {
    return this.repository.save(dto);
  }

  async update(dto: UpdateCategoryDto): Promise<CategoryEntity> {
    return await this.repository.save(dto);
  }

  async findOneById(id: ID): Promise<CategoryEntity | undefined> {
    return await this.repository.findOneBy({ id });
  }

  async findAll(): Promise<Array<CategoryEntity>> {
    return await this.repository.find();
  }

  async delete(dto: CategoryEntity): Promise<CategoryEntity> {
    return await this.repository.remove(dto);
  }
}
