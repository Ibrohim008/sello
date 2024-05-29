import { ResData } from 'src/lib/resData';
import { ProductEntity } from '../entities/product.entity';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ID } from 'src/common/types/type';

export interface IProductService {
  create(createProductDto: CreateProductDto): Promise<ResData<ProductEntity>>;
  update(
    id: ID,
    updateProductDto: UpdateProductDto,
  ): Promise<ResData<ProductEntity>>;
  findOne(id: ID): Promise<ResData<ProductEntity | undefined>>;
  findAll(): Promise<ResData<Array<ProductEntity>>>;
  remove(id: ID): Promise<ResData<ProductEntity>>;
}
