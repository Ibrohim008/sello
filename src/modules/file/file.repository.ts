import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ID } from 'src/common/types/type';
import { IFileRepository } from './interfaces/file.repository';
import { FileEntity } from './entities/file.entity';
import { CreateFileDto } from './dto/create-file.dto';

export class FileRepository implements IFileRepository {
  constructor(
    @InjectRepository(FileEntity)
    private repository: Repository<FileEntity>,
  ) {}

  async create(dto: FileEntity): Promise<FileEntity> {
    return this.repository.save(dto);
  }

  async createEntity(dto: FileEntity): Promise<FileEntity> {
    return this.repository.create(dto);
  }

  async findOneById(id: ID): Promise<FileEntity | undefined> {
    return await this.repository.findOneBy({ id });
  }

  async findAll(): Promise<Array<FileEntity>> {
    return await this.repository.find();
  }

  async delete(dto: FileEntity): Promise<FileEntity> {
    return await this.repository.remove(dto);
  }
}
