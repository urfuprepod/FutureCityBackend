import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { Pagination } from 'src/shared/types';
import { GetPagination } from 'src/decorators/pagination-decorator';
import { CreateDocumentDto } from './dto/create-document.dto';
import { GetDocumentsByIdDto } from './dto/get-documents-byId.dto';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentService: DocumentsService) {}

  @Get()
  async getDocs(@GetPagination() pagination: Pagination) {
    return await this.documentService.getDocuments(pagination);
  }

  @Post('/create')
  @UseInterceptors(FilesInterceptor('image'))
  async createDoc(
    @Body() createDocumentDto: CreateDocumentDto,
    @UploadedFile() image: any,
  ) {
    return await this.documentService.createDocument(createDocumentDto, image);
  }

  @Delete(':id')
  async deleteDoc(@Param('id') id: string) {
    await this.documentService.deleteDocumentById(+id);
  }

  @Post('/getById')
  async getDocById(@Body() createDocumentDto: GetDocumentsByIdDto) {
    return await this.documentService.getDocumentByIds(createDocumentDto.ids);
  }
}
