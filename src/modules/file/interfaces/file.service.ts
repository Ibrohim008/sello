import { ResData } from 'src/lib/resData';
import { ID } from 'src/common/types/type';
import { CreateFileDto } from '../dto/create-file.dto';
import { FileEntity } from '../entities/file.entity';

export interface IFileService {
  create(createFileDto: any): Promise<ResData<FileEntity>>;
  findOne(id: ID): Promise<ResData<FileEntity>>;
  findAll(): Promise<ResData<Array<FileEntity>>>;
  remove(id: ID): Promise<ResData<FileEntity>>;
}
