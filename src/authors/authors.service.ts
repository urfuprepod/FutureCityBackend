import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FilesService } from 'src/files/files.service';
import { Author } from './authors.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateAuthorDto } from './dto/create-author.dto';
import { DocumentsService } from 'src/documents/documents.service';
import { AddDocumentDto } from './dto/add-document.dto';
import { Op } from 'sequelize';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectModel(Author) private authorRepository: typeof Author,
    private fileService: FilesService,
    private documentService: DocumentsService,
  ) {}

  async createAuthor(dto: CreateAuthorDto, image: any) {
    const fileName = await this.fileService.createFile(image);
    const post = await this.authorRepository.create({
      ...dto,
      avatarUrl: fileName,
    });
    return post;
  }

  async addDocumentsToAuthor(addDocumentDto: AddDocumentDto) {
    const user = await this.authorRepository.findByPk(addDocumentDto.authorId);

    const documentsIds = Array.isArray(addDocumentDto.documentsId)
      ? addDocumentDto.documentsId
      : [addDocumentDto.documentsId];

    const documents = await this.documentService.getDocumentByIds(documentsIds);

    if (user) {
      //  user.update({ roles: [...user.roles, currentRole] });
      await user.$add('documents', [...documents.map((el) => el.id)]);

      return await user.save();
    }
    throw new HttpException('Ошибка', HttpStatus.NOT_FOUND);
  }

  async getAuthors(search?: string) {
    const authors = await this.authorRepository.findAll({
      where: { fullName: { [Op.iLike]: search ?? '' } },
      include: [{ all: true }],
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
