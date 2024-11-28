import { Injectable } from '@nestjs/common';
import { Tag } from './tags.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTagDto } from './dto/create-tag.dto';
import { FutureStatusService } from 'src/future-status/future-status.service';

@Injectable()
export class TagsService {
  constructor(
    @InjectModel(Tag) private tagRepository: typeof Tag,
    private futureStatusService: FutureStatusService,
  ) {}

  async getTagsByFutureStatus(status: string) {
    const tags = await this.tagRepository.findAll({
      where: { status: { name: status } },
      include: [{ all: true }],
    });
    return tags;
  }

  async createTag(dto: CreateTagDto) {
    const tag = await this.tagRepository.create({ ...dto });
    const status = await this.futureStatusService.getStatusById(
      dto.futureStatusId,
    );
    if (status) {
      status.$add('tags', tag.id);
    }
    return tag;
  }
}
