import { HttpException, HttpStatus } from '@nestjs/common';

export class FileTypeException extends HttpException {
  constructor(fileType: string) {
    super(
      `File type expected to be image instead of ${fileType}`,
      HttpStatus.BAD_REQUEST,
    );
  }
}

export class FileNotFounException extends HttpException {
  constructor() {
    super(`File not found`, HttpStatus.NOT_FOUND);
  }
}
