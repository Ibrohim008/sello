import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { ID } from 'src/common/types/type';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  // @Patch(':id')
  // update(@Param('id') id: ID, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }

  @Get(':id')
  findById(@Param('id') id: ID) {
    return this.userService.findOneById(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: ID) {
    return this.userService.remove(+id);
  }
}
