import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import { ID } from 'src/common/types/type';
import { UserNotFoundException } from './exception/user.exception';
import { ResData } from 'src/lib/resData';

@Injectable()
export class UserService {
  constructor(private readonly repository: UserRepository) {}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
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

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
