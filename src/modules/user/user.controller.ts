import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { ID } from 'src/common/types/type';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { RedisKeys } from 'src/common/enums/enum';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseInterceptors(CacheInterceptor)
  @CacheKey(RedisKeys.ALL_USERS)
  @CacheTTL(0)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: ID, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Get(':id')
  findById(@Param('id') id: ID) {
    return this.userService.findOneById(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: ID) {
    return this.userService.remove(+id);
  }
}
