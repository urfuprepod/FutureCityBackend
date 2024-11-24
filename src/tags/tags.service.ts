import { Injectable } from '@nestjs/common';
import { Tag } from './tags.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class TagsService {
  constructor(@InjectModel(Tag) private tagRepository: typeof Tag) {}

  async getTagsByFutureStatus(status: string) {
    const tags = await this.tagRepository.findAll({
      where: { status: { name: status } },
      include: [{ all: true }],
    });
    return tags;
  }
}
