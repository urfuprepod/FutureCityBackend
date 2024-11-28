import { Module } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { DocumentsController } from './documents.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Document } from './documents.model';
import { Tag } from 'src/tags/tags.model';
import { FutureStatusModule } from 'src/future-status/future-status.module';
import { Author } from 'src/authors/authors.model';
import { FilesModule } from 'src/files/files.module';

@Module({
  providers: [DocumentsService],
  controllers: [DocumentsController],
  imports: [
    FutureStatusModule,
    FilesModule,
    SequelizeModule.forFeature([Document, Tag, FutureStatusModule, Author]),
  ],
})
export class DocumentsModule {}
