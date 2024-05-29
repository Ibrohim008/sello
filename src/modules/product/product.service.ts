import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ResData } from 'src/lib/resData';
import { ID } from 'src/common/types/type';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductRepository } from './product.repository';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductNotFoundException } from './exception/product.exception';
import { RedisKeys } from 'src/common/enums/enum';
import { Cache } from 'cache-manager';
import { ProductEntity } from './entities/product.entity';
import { IProductService } from './interfaces/product.service';
import { ICategoryService } from '../category/interfaces/category.service';

@Injectable()
export class ProductService implements IProductService {
  constructor(
    @Inject('IProductRepository')
    private readonly repository: ProductRepository,
    @Inject('CACHE_MANAGER') private cacheManager: Cache,
    @Inject('ICategoryService')
    private readonly categoryService: ICategoryService,
  ) {}
  async create(
    createProductDto: CreateProductDto,
  ): Promise<ResData<ProductEntity>> {
    await this.categoryService.findOne(+createProductDto.category);

    const entity = await this.repository.createEntity(createProductDto);

    const data = await this.repository.create(entity);

    return new ResData('Created successfully', HttpStatus.CREATED, data);
  }

  async findAll(): Promise<ResData<Array<ProductEntity>>> {
    const data = await this.repository.findAll();

    return new ResData('Found successfully', HttpStatus.OK, data);
  }

  async findOne(id: ID): Promise<ResData<ProductEntity | undefined>> {
    const data = await this.repository.findOneById(id);

    if (!data) {
      throw new ProductNotFoundException();
    }

    return new ResData('Found successfully', HttpStatus.OK, data);
  }

  async update(
    id: ID,
    updateProductDto: UpdateProductDto,
  ): Promise<ResData<ProductEntity>> {
    const { data: foundProduct } = await this.findOne(id);

    const updatedProduct = Object.assign(foundProduct, updateProductDto);

    console.log(updateProductDto);

    // const entity = await this.repository.create(updateProductDto)

    const data = await this.repository.update(updatedProduct);

    await this.deleteDataInRedis(RedisKeys.All_PRODUCTS);

    const resData = new ResData('Updated successfully', HttpStatus.OK, data);

    return resData;
  }

  async remove(id: number) {
    const { data: foundProduct } = await this.findOne(id);

    const data = await this.repository.delete(foundProduct);

    await this.deleteDataInRedis(RedisKeys.ALL_USERS);

    const resData = new ResData('Product deleted', HttpStatus.OK, data);

    return resData;
  }

  private async deleteDataInRedis(key: RedisKeys) {
    await this.cacheManager.del(key);
  }
}
