import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Tag } from './tags.model';

@Module({
  providers: [TagsService],
  controllers: [TagsController],
  imports: [SequelizeModule.forFeature([Tag]),]
})
export class TagsModule {}
