import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import { ID } from 'src/common/types/type';
import { UserNotFoundException } from './exception/user.exception';
import { ResData } from 'src/lib/resData';
import { RegisterDto } from '../auth/dto/auth.dto';
import { UserEntity } from './entities/user.entity';
import { Cache } from 'cache-manager';
import { RedisKeys } from 'src/common/enums/enum';

@Injectable()
export class UserService {
  constructor(
    private readonly repository: UserRepository,
    @Inject('CACHE_MANAGER') private cacheManager: Cache,
  ) {}

  async create(createUserDto: RegisterDto) {
    await this.deleteDataInRedis(RedisKeys.ALL_USERS);

    const user = await this.repository.create(createUserDto);

    return new ResData('Created', HttpStatus.CREATED, user);
  }

  async findAll() {
    // const getData: Array<UserEntity> = await this.cacheManager.get('users'); >>second way<<

    // if (getData) {
    //   return new ResData<Array<UserEntity>>('All users', 200, getData);
    // }

    const data = await this.repository.findAll();

    // await this.cacheManager.set('users', data, 20 * 1000);

    return new ResData<Array<UserEntity>>('All users', HttpStatus.OK, data);
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

  async update(id: ID, updateUserDto: UpdateUserDto) {
    const { data: foundUser } = await this.findOneById(id);

    const updatedUser = Object.assign(foundUser, updateUserDto);

    const data = await this.repository.update(updatedUser);

    await this.deleteDataInRedis(RedisKeys.ALL_USERS);

    return new ResData('User updated', HttpStatus.OK, data);
  }

  async remove(id: ID) {
    await this.deleteDataInRedis(RedisKeys.ALL_USERS);

    const { data: foundUser } = await this.findOneById(id);

    const data = await this.repository.remove(foundUser);

    return new ResData('User deleted', HttpStatus.OK, data);
  }

  private async deleteDataInRedis(key: RedisKeys) {
    await this.cacheManager.del(key);
  }
}
