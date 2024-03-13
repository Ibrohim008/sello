import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { CategoryModule } from './modules/category/category.module';
import { ProductModule } from './modules/product/product.module';
import { TransactionModule } from './modules/transaction/transaction.module';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './modules/user/entities/user.entity';
import { CategoryEntity } from './modules/category/entities/category.entity';
import { ProductEntity } from './modules/product/entities/product.entity';
import { TransactionEntity } from './modules/transaction/entities/transaction.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '2004',
      database: 'product_typeorm',
      entities: [UserEntity, CategoryEntity, ProductEntity, TransactionEntity],
      synchronize: true,
    }),
    AuthModule,
    CategoryModule,
    ProductModule,
    TransactionModule,
    UserModule,
  ],
})
export class AppModule {}
