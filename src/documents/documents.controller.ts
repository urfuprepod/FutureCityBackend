import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { Pagination } from 'src/shared/types';
import { GetPagination } from 'src/decorators/pagination-decorator';
import { CreateDocumentDto } from './dto/create-document.dto';
import { GetDocumentsByIdDto } from './dto/get-documents-byId.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentService: DocumentsService) {}

  @Get()
  async getDocs(@GetPagination() pagination: Pagination) {
    return await this.documentService.getDocuments(pagination);
  }

  @Post('/create')
  @UseInterceptors(
    FilesInterceptor('file', 1, {
      storage: diskStorage({
        destination: './static',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  async createDoc(
    @UploadedFiles() files: Array<Express.Multer.File>,
    // @Body() dto: CreateDocumentDto,
  ) {
    console.log(files);
    // console.log(createDocumentDto, file, 'мои яйца');
    return await this.documentService.createDocument(files);
  }

  @Delete('/delete/:id')
  async deleteDoc(@Param('id') id: string) {
    await this.documentService.deleteDocumentById(+id);
  }

  @Post('/getById')
  async getDocById(@Body() createDocumentDto: GetDocumentsByIdDto) {
    return await this.documentService.getDocumentByIds(createDocumentDto.ids);
  }

  @Get('/author/:authorId')
  async getDocumentsByAuthorId(@Param('authorId') authorId: number) {
    return await this.documentService.getDocumentsByAuthorId(authorId);
  }
}
