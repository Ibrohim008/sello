import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ID } from 'src/common/types/type';
import { ProductEntity } from './entities/product.entity';
import { IProductRepository } from './interfaces/product.repository';
import { CreateProductDto } from './dto/create-product.dto';

export class ProductRepository implements IProductRepository {
  constructor(
    @InjectRepository(ProductEntity)
    private repository: Repository<ProductEntity>,
  ) {}

  async createEntity(
    createProductDto: CreateProductDto,
  ): Promise<ProductEntity> {
    return this.repository.create(createProductDto);
  }

  async create(dto: ProductEntity): Promise<ProductEntity> {
    return this.repository.save(dto);
  }

  async update(dto: ProductEntity): Promise<ProductEntity> {
    return await this.repository.save(dto);
  }

  async findOneById(id: ID): Promise<ProductEntity | undefined> {
    return await this.repository.findOneBy({ id });
  }

  async findAll(): Promise<Array<ProductEntity>> {
    return await this.repository.find();
  }

  async delete(dto: ProductEntity): Promise<ProductEntity> {
    return await this.repository.remove(dto);
  }
}
