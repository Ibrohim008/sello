import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { CategoryEntity } from 'src/modules/category/entities/category.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';

export class CreateProductDto {
  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  brand: string;

  @ApiProperty({
    type: Number,
  })
  @IsNumber()
  @IsNotEmpty()
  seller: UserEntity;

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
}
