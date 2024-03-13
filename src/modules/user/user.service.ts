import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import { ID } from 'src/common/types/type';
import { UserNotFoundException } from './exception/user.exception';
import { ResData } from 'src/lib/resData';
import { RegisterDto } from '../auth/dto/auth.dto';

@Injectable()
export class UserService {
  constructor(private readonly repository: UserRepository) {}

  async create(createUserDto: RegisterDto) {
    const user = await this.repository.create(createUserDto);

    return new ResData('Created', HttpStatus.CREATED, user);
  }

  async findAll() {
    const users = await this.repository.findAll();
    return new ResData('success', HttpStatus.OK, users);
  }

  async findOneById(id: ID) {
    const foundData = await this.repository.findOneById(id);

    if (!foundData) {
      throw new UserNotFoundException();
    }

    return new ResData('success', 200, foundData);
  }

  async findOneByLogin(login: string) {
    const foundData = await this.repository.findOneByLogin(login);

    const resData = new ResData('success', 200, foundData);

    if (!foundData) {
      resData.message = 'Not Found';
      resData.statusCode = 404;
    }

    return resData;
  }

  // update(id: ID, updateUserDto: UpdateUserDto) {
    
  //   return ;
  // }

  remove(id: ID) {
    return `This action removes a #${id} user`;
  }
}
