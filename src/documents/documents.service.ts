import { Injectable } from '@nestjs/common';
import { Document } from './documents.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateDocumentDto } from './dto/create-document.dto';
import { Pagination } from 'src/shared/types';
import { Op } from 'sequelize';
import { FutureStatusService } from 'src/future-status/future-status.service';
import { FilesService } from 'src/files/files.service';
import { Author } from 'src/authors/authors.model';
import { Tag } from 'src/tags/tags.model';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectModel(Document) private documentRepository: typeof Document,
    private futureStatusService: FutureStatusService,
    private fileService: FilesService,
  ) {}

  async getDocuments(isEmpty?: boolean) {
    const documents = await this.documentRepository.findAll({
      include: [{ model: Author }, {model: Tag}] ,
    });

    return documents.filter((el) => !isEmpty || !el.authors.length);
  }

  async getDocumentsWithoutAuthor() {}

  async createDocument(file: any) {
    const document = await this.documentRepository.create({
      title: 'отсоси мои яички4',
      tags: [],
      year: 2024,
      futureStatusId: 0,
      file: file[0].filename,
    });
    const currentStatus = await this.futureStatusService.getStatusById(0);
    currentStatus.$add('documents', document.id);
    return document;
  }

  async getDocumentByIds(ids: number[]) {
    const documents = await this.documentRepository.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      include: [{ all: true }],
    });

    return documents;
  }

  async deleteDocumentById(id: number) {
    const document = await this.documentRepository.findByPk(id);
    if (!document) {
      throw new Error('Документ не найден');
    }
    await document.destroy();
    return true;
  }

  async getDocumentsByAuthorId(authorId: number) {
    const documents = await this.documentRepository.findAll({
      where: {
        authors: {
          id: authorId,
        },
      },
      include: [{ all: true }],
    });
    return documents;
  }
}
