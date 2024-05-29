import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { Request } from 'express';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { FileTypeException } from 'src/modules/file/exception/file.exception';

export const fileOption: MulterOptions = {
  limits: { fileSize: 100000000 },
  storage: diskStorage({
    destination: (
      req: Request,
      file: Express.Multer.File,
      cb: (err: Error | null, dest: string) => void,
    ) => {
      const uploadPath = 'upload';

      if (!existsSync(uploadPath)) {
        mkdirSync(uploadPath);
      }

      cb(null, uploadPath);
    },
    filename: (
      req: Request,
      file: Express.Multer.File,
      cb: (error: Error | null, filename: string) => void,
    ): void => {
      cb(
        null,
        `${file.mimetype.split('/')[0]}__${Date.now()}.${file.mimetype.split('/')[1]}`,
      );
    },
  }),
  fileFilter: (
    req: Request,
    file: Express.Multer.File,
    cb: (err: Error | null, acceptFile: boolean) => void,
  ) => {
    const constFileType = file.mimetype.split('/')[0];

    if (constFileType === 'image') {
      cb(null, true);
    } else {
      cb(new FileTypeException(constFileType), false);
    }
  },
};
