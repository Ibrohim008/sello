import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { FileEntity } from './entities/file.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileRepository } from './file.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([FileEntity]),
    // MulterModule.register({
    //   storage: diskStorage({
    //     destination: (
    //       req: Request,
    //       file: Express.Multer.File,
    //       cb: (err: Error | null, dest: string) => void,
    //     ) => {
    //       const uploadPath = 'upload';
    //       if (!existsSync(uploadPath)) {
    //         mkdirSync(uploadPath);
    //       }
    //       const constFileType = file.mimetype.split('/')[0];
    //       if (constFileType === 'image') {
    //         cb(null, uploadPath);
    //       } else {
    //         cb(new FileTypeException(constFileType), uploadPath);
    //       }
    //     },
    //     filename: (
    //       req: Request,
    //       file: Express.Multer.File,
    //       cb: (error: Error | null, filename: string) => void,
    //     ): void => {
    //       cb(
    //         null,
    //         `${file.mimetype.split('/')[0]}__${Date.now()}.${file.mimetype.split('/')[1]}`,
    //       );
    //     },
    //   }),
    // }),
  ],
  controllers: [FileController],
  providers: [
    { provide: 'IFileService', useClass: FileService },
    { provide: 'IFileRepository', useClass: FileRepository },
  ],
})
export class FileModule {}
