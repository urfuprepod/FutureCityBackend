import { forwardRef, Module } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { AuthorsController } from './authors.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Author } from './authors.model';
import { Document } from 'src/documents/documents.model';
import { FilesModule } from 'src/files/files.module';
import { DocumentsModule } from 'src/documents/documents.module';
import { Tag } from 'src/tags/tags.model';

@Module({
  providers: [AuthorsService],
  controllers: [AuthorsController],
  imports: [forwardRef(() => DocumentsModule), FilesModule, SequelizeModule.forFeature([Author, Document, Tag])],
})
export class AuthorsModule {}
