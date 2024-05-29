import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiTags } from '@nestjs/swagger';
import { CategoryAlreadyExistException } from './exception/category.exception';
import { ICategoryRepository } from './interfaces/category.repository';
import { ICategoryService } from './interfaces/category.service';
import { ID } from 'src/common/types/type';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(
    @Inject('ICategoryService')
    private readonly categoryService: ICategoryService,
    @Inject('ICategoryRepository')
    private readonly categoryRepository: ICategoryRepository,
  ) {}

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    const foundByName = await this.categoryRepository.findOneByName(
      createCategoryDto.name,
    );

    if (foundByName.length) {
      throw new CategoryAlreadyExistException();
    }

    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: ID) {
    return this.categoryService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: ID,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    
    const foundByName = await this.categoryRepository.findOneByName(
      updateCategoryDto.name,
    );

    if (foundByName.length) {
      throw new CategoryAlreadyExistException();
    }

    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: ID) {
    return this.categoryService.remove(id);
  }
}
