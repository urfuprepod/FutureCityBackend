import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Tag } from './tags.model';
import { Document } from 'src/documents/documents.model';
import { FutureStatus } from 'src/future-status/future-status.model';
import { FutureStatusModule } from 'src/future-status/future-status.module';

@Module({
  providers: [TagsService],
  controllers: [TagsController],
  imports: [
    FutureStatusModule,
    SequelizeModule.forFeature([Tag, Document, FutureStatus]),
  ],
})
export class TagsModule {}
