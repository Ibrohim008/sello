import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProductRepository } from './product.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { existsSync, mkdirSync } from 'fs';
import { Request } from 'express';
import { CategoryService } from '../category/category.service';
import { CategoryRepository } from '../category/category.repository';
import { CategoryEntity } from '../category/entities/category.entity';
import { UserService } from '../user/user.service';
import { UserRepository } from '../user/user.repository';
import { UserEntity } from '../user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity, CategoryEntity, UserEntity]),

    
  ],

  controllers: [ProductController],
  providers: [
    { provide: 'IProductService', useClass: ProductService },
    { provide: 'IProductRepository', useClass: ProductRepository },
    { provide: 'ICategoryService', useClass: CategoryService },
    { provide: 'ICategoryRepository', useClass: CategoryRepository },
    UserService,
    UserRepository,
  ],
})
export class ProductModule {}
