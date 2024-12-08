import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreateAuthorDto } from './dto/create-author.dto';
import { AddDocumentDto } from './dto/add-document.dto';
import { diskStorage } from 'multer';
import { extname } from 'path';
import * as uuid from 'uuid';

@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorService: AuthorsService) {}

  @Get('/all')
  getAllAuthors(@Query('search') search: string) {
    return this.authorService.getAuthors(search);
  }

  @Get('one/:id')
  getAuthorById(@Param('id') id: string) {
    return this.authorService.getAuthorById(+id);
  }

  @Post('create')
  @UseInterceptors(
    FilesInterceptor('image', 1, {
      fileFilter: (_, file, callback) => {
        const allowed = ['.jpg', '.png', '.jpeg'];
        const ext = extname(file.originalname);
        if (!allowed.includes(ext)) {
          return callback(new Error('Допустимы только картинки'), false);
        }
        callback(null, true);
      },
      storage: diskStorage({
        destination: './static/avatars',

        filename: (_, file, cb) => {
          const ext = extname(file.originalname);
          const fileName = uuid.v4();
          cb(null, `${fileName}${ext}`);
        },
      }),
    }),
  )
  createAuthor(
    @Body() createAuthorDto: CreateAuthorDto,
    @UploadedFiles() image: Array<Express.Multer.File>,
  ) {
    console.log(image);
    return this.authorService.createAuthor(createAuthorDto, image);
  }

  @Post('/add-documents')
  addDocumentsToAuthor(@Body() addDocumentDto: AddDocumentDto) {
    return this.authorService.addDocumentsToAuthor(addDocumentDto);
  }
}
