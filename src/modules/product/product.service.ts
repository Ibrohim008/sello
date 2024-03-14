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

@Injectable()
export class ProductService {
  constructor(
    @Inject('IProductRepository')
    private readonly repository: ProductRepository,
    @Inject('CACHE_MANAGER') private cacheManager: Cache,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const data = await this.repository.create(createProductDto);

    await this.deleteDataInRedis(RedisKeys.ALL_USERS);

    const resData = new ResData(
      'Created Successfully',
      HttpStatus.CREATED,
      data,
    );

    return resData;
  }

  async findAll() {
    return await this.repository.findAll();
  }

  async findOne(id: number) {
    const data = await this.repository.findOneById(id);

    if (!data) {
      throw new ProductNotFoundException();
    }

    const resData = new ResData('product found', HttpStatus.OK, data);

    return resData;
  }

  async update(id: ID, updateProductDto: UpdateProductDto) {
    const { data: foundProduct } = await this.findOne(id);

    const updatedProduct = Object.assign(foundProduct, updateProductDto);

    const data = await this.repository.update(updatedProduct);

    await this.deleteDataInRedis(RedisKeys.ALL_USERS);

    const resData = new ResData('Updated Product', HttpStatus.OK, data);

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
