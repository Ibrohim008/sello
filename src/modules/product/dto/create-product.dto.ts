import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ID } from 'src/common/types/type';
import { CategoryEntity } from 'src/modules/category/entities/category.entity';
import { TransactionEntity } from 'src/modules/transaction/entities/transaction.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';

export class CreateProductDto {
  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  description: string;

  @ApiProperty({
    type: Number,
  })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({ type: Number })
  @IsNumber()
  @IsNotEmpty()
  count: number;

  @ApiProperty({ type: Number })
  @IsNumber()
  @IsNotEmpty()
  category: CategoryEntity;

  createdBy: UserEntity;

  lastEditedBy: UserEntity;

  transactions: Array<TransactionEntity>;
  lastUpdateAt: Date;
  createdAt: Date;
  id: ID;
}
