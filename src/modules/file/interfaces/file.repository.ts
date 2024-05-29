import { ID } from 'src/common/types/type';
import { CreateFileDto } from '../dto/create-file.dto';
import { FileEntity } from '../entities/file.entity';

export interface IFileRepository {
  create(dto: FileEntity): Promise<FileEntity>;
  createEntity(dto: any): Promise<FileEntity>;
  findAll(): Promise<Array<FileEntity>>;
  findOneById(id: ID): Promise<FileEntity>;
  delete(dto: FileEntity): Promise<FileEntity>;
}
