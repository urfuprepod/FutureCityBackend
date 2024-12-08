import { Module } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { DocumentsController } from './documents.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Document } from './documents.model';
import { Tag } from 'src/tags/tags.model';
import { FutureStatusModule } from 'src/future-status/future-status.module';
import { Author } from 'src/authors/authors.model';
import { FilesModule } from 'src/files/files.module';
import { FutureStatus } from 'src/future-status/future-status.model';
import { DocumentsTags } from './documents-tags.model';
import { AuthorsDocuments } from './documents-authors.model';
import { UploadController } from 'src/controllers';

@Module({
  providers: [DocumentsService],
  controllers: [DocumentsController, UploadController],
  imports: [
    FutureStatusModule,
    FilesModule,
    SequelizeModule.forFeature([
      Document,
      Tag,
      FutureStatus,
      DocumentsTags,
      AuthorsDocuments,
      Author,
    ]),
  ],
  exports: [DocumentsService],
})
export class DocumentsModule {}
