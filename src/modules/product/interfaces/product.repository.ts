import { ID } from 'src/common/types/type';
import { CreateProductDto } from '../dto/create-product.dto';
import { ProductEntity } from '../entities/product.entity';

export interface IProductRepository {
  create(dto: ProductEntity): Promise<ProductEntity>;
  createEntity(createProductDto: Partial<CreateProductDto>): Promise<ProductEntity>;
  update(dto: ProductEntity): Promise<ProductEntity>;
  findOneById(id: ID): Promise<ProductEntity | undefined>;
  findAll(): Promise<Array<ProductEntity>>;
  delete(dto: ProductEntity): Promise<ProductEntity>;
}
