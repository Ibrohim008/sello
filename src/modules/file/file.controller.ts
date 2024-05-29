import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Inject,
} from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileOption } from 'src/lib/file';
import { IFileService } from './interfaces/file.service';

@ApiTags('file')
@Controller('file')
export class FileController {
  constructor(
    @Inject('IFileService')
    private readonly fileService: IFileService,
  ) {}

  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary' },
        fileName: { type: 'string', nullable: true },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file', fileOption))
  uploadFile(
    @UploadedFile()
    file: Express.Multer.File,
    @Body() dto: CreateFileDto,
  ) {
    const fileData = {
      ...file,
      name: dto.fileName ? dto.fileName : file.originalname,
    };

    return this.fileService.create(fileData);
  }

  @Get()
  findAll() {
    return this.fileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fileService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fileService.remove(+id);
  }
}
