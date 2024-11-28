import { Module } from '@nestjs/common';
import { FutureStatusController } from './future-status.controller';
import { FutureStatusService } from './future-status.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Tag } from 'src/tags/tags.model';
import { Document } from 'src/documents/documents.model';
import { FutureStatus } from './future-status.model';

@Module({
  controllers: [FutureStatusController],
  providers: [FutureStatusService],
  imports: [SequelizeModule.forFeature([Tag, Document, FutureStatus])],
})
export class FutureStatusModule {}
