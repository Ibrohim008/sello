import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ID } from 'src/common/types/type';
import { CategoryEntity } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ICategoryRepository } from './interfaces/category.repository';

export class CategoryRepository implements ICategoryRepository {
  constructor(
    @InjectRepository(CategoryEntity)
    private repository: Repository<CategoryEntity>,
  ) {}

  async create(dto: CategoryEntity): Promise<CategoryEntity> {
    return this.repository.save(dto);
  }

  async createEntity(
    dto: CreateCategoryDto | UpdateCategoryDto,
  ): Promise<CategoryEntity> {
    return this.repository.create(dto);
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

  async findOneByName(name: string): Promise<Array<CategoryEntity>> {
    return await this.repository.findBy({ name });
  }

  async delete(dto: CategoryEntity): Promise<CategoryEntity> {
    return await this.repository.remove(dto);
  }
}
