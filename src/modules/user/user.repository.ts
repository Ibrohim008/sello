import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { ID } from 'src/common/types/type';

export class UserRepository {
  constructor(
    @InjectRepository(UserEntity) private repository: Repository<UserEntity>,
  ) {}

  async findOneById(id: ID): Promise<UserEntity | undefined> {
    return await this.repository.findOneBy({ id });
  }

  async findOneByLogin(login: string): Promise<UserEntity | undefined> {
    return await this.repository.findOneBy({ login });
  }
}
