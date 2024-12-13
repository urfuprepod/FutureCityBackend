import { Injectable } from '@nestjs/common';
import { Document } from './documents.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateDocumentDto } from './dto/create-document.dto';
import { Op } from 'sequelize';
import { FutureStatusService } from 'src/future-status/future-status.service';
import { FilesService } from 'src/files/files.service';
import { Author } from 'src/authors/authors.model';
import { Tag } from 'src/tags/tags.model';
import { FutureStatus } from 'src/future-status/future-status.model';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectModel(Document) private documentRepository: typeof Document,
    private futureStatusService: FutureStatusService,
    private fileService: FilesService,
  ) {}

  async getDocuments(isEmpty?: boolean) {
    const documents = await this.documentRepository.findAll({
      include: [
        { model: Author },
        { model: Tag },
        { model: FutureStatus, },
      ],
    });

    return documents.filter((el) => !isEmpty || !el.authors.length);
  }

  async getDocumentsWithoutAuthor() {}

  async createDocument(dto: CreateDocumentDto, file: any) {
    const {tagIds, authorIds} = dto;
    const document = await this.documentRepository.create({
      ...dto,
      futureStatusId: +dto.futureStatusId,
      year: +dto.year,
      file: file[0].filename,
    });
    if (authorIds) {
      document.$set('authors', typeof authorIds === 'string' ? +authorIds : authorIds.map(el => +el));
    }
    if (tagIds) {
      document.$set('tags', typeof tagIds === 'string' ? +tagIds : tagIds.map(el => +el));
    }
    const currentStatus = await this.futureStatusService.getStatusById(+dto.futureStatusId);
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
