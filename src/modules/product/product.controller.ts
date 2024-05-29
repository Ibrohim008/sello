import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  Inject,
  ParseIntPipe,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { RedisKeys } from 'src/common/enums/enum';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from '../user/user.service';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(
    @Inject('IProductService')
    private readonly productService: ProductService,
    private readonly userService: UserService,
  ) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    await this.userService.findOneById(+createProductDto.seller);

    return this.productService.create(createProductDto);
  }

  @UseInterceptors(CacheInterceptor)
  @CacheKey(RedisKeys.All_PRODUCTS)
  @CacheTTL(0)
  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productService.remove(id);
  }
}
