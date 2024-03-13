import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { ID } from 'src/common/types/type';
import { RegisterDto } from '../auth/dto/auth.dto';
import { UpdateUserDto } from './dto/update-user.dto';

export class UserRepository {
  constructor(
    @InjectRepository(UserEntity) private repository: Repository<UserEntity>,
  ) {}

  async create(dto: RegisterDto): Promise<UserEntity | undefined> {
    return await this.repository.save(dto);
  }

  async update(id: ID, dto: UpdateUserDto): Promise<UserEntity> {
    return await this.repository.save(dto);
  }

  async findOneById(id: ID): Promise<UserEntity | undefined> {
    return await this.repository.findOneBy({ id });
  }

  async findAll(): Promise<Array<UserEntity>> {
    return await this.repository.find();
  }

  async findOneByLogin(login: string): Promise<UserEntity | undefined> {
    return await this.repository.findOneBy({ login });
  }
}
