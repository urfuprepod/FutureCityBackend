import { Injectable } from '@nestjs/common';
import { Document } from './documents.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateDocumentDto } from './dto/create-document.dto';
import { Pagination } from 'src/shared/types';
import { Op } from 'sequelize';
import { FutureStatusService } from 'src/future-status/future-status.service';
import { FilesService } from 'src/files/files.service';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectModel(Document) private documentRepository: typeof Document,
    private futureStatusService: FutureStatusService,
    private fileService: FilesService,
  ) {}

  async getDocuments(params: Pagination, statusId?: number) {
    const { page, limit, search } = params;

    const documents = await this.documentRepository.findAndCountAll({
      where: {
        status: statusId ? { id: statusId } : true,
        title: {
          [Op.iLike]: search ?? '',
        },
      },
      include: [{ all: true }],
      offset: (page - 1) * limit,
      limit,
    });
    return documents;
  }

  async createDocument(dto: CreateDocumentDto, image: any) {
    console.log(image);
    const fileName = await this.fileService.createFile(image);
    const document = await this.documentRepository.create({
      ...dto,
      tags: dto.tagIds,
      file: fileName,
    });
    const currentStatus = await this.futureStatusService.getStatusById(
      dto.status,
    );
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
}
