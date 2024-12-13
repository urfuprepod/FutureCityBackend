import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FilesService } from 'src/files/files.service';
import { Author } from './authors.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateAuthorDto } from './dto/create-author.dto';
import { DocumentsService } from 'src/documents/documents.service';
import { AddDocumentDto } from './dto/add-document.dto';
import { Op } from 'sequelize';
import { Document } from 'src/documents/documents.model';
import { Tag } from 'src/tags/tags.model';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectModel(Author) private authorRepository: typeof Author,
    private fileService: FilesService,
    private documentService: DocumentsService,
  ) {}

  async createAuthor(dto: CreateAuthorDto, image: any) {
    const fileName = image?.[0]?.filename
      ? `static/avatars/${image?.[0]?.filename}`
      : undefined;
    const author = await this.authorRepository.create({
      ...dto,
      avatarUrl: fileName,
    });
    if (dto.documents?.length) {
      await author.$set('documents', dto.documents);
    }
    return author;
  }

  async editAuthor(dto: any, id: number, image?: Array<Express.Multer.File>) {
    const current = await Author.findByPk(id);
    current.update(dto);
    if (dto.documents) {
      current.$set('documents', dto.documents);
    }
    if (image?.[0]?.filename) {
      current.avatarUrl = `static/avatars/${image?.[0]?.filename}`;
    }
    await current.save();
    return current;
  }

  async addDocumentsToAuthor(addDocumentDto: AddDocumentDto) {
    const user = await this.authorRepository.findByPk(addDocumentDto.authorId);

    const documentsIds = Array.isArray(addDocumentDto.documentsId)
      ? addDocumentDto.documentsId
      : [addDocumentDto.documentsId];

    const documents = await this.documentService.getDocumentByIds(documentsIds);

    if (user) {
      await user.$add('documents', [...documents.map((el) => el.id)]);

      return await user.save();
    }
    throw new HttpException('Ошибка', HttpStatus.NOT_FOUND);
  }

  async getAuthors(search?: string) {
    const authors = await this.authorRepository.findAll({
      where: { fullName: { [Op.iLike]: `%${search ?? ''}%` } },
      include: [{ model: Document, include: [{ model: Tag }] }],
    });
    return authors;
  }

  async getAuthorById(id: number) {
    const author = await this.authorRepository.findByPk(id, {
      include: [{ all: true }],
    });
    return author;
  }
}
