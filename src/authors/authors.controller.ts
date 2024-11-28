import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreateAuthorDto } from './dto/create-author.dto';
import { AddDocumentDto } from './dto/add-document.dto';

@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorService: AuthorsService) {}

  @Get()
  getAllAuthors(@Query('search') search: string) {
    return this.authorService.getAuthors(search);
  }

  @Get(':id')
  getAuthorById(@Param('id') id: string) {
    return this.authorService.getAuthorById(+id);
  }

  @Post('create')
  @UseInterceptors(FilesInterceptor('image'))
  createAuthor(
    @Body() createAuthorDto: CreateAuthorDto,
    @UploadedFile() image: any,
  ) {
    return this.authorService.createAuthor(createAuthorDto, image);
  }

  @Post('/add-documents')
  addDocumentsToAuthor(@Body() addDocumentDto: AddDocumentDto) {
    return this.authorService.addDocumentsToAuthor(addDocumentDto);
  }
}
