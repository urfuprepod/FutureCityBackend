import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post('/create')
  async createTag(@Body() dto: CreateTagDto) {
    return this.tagsService.createTag(dto);
  }

  @Get('/current')
  async getTags2(@Query('status') status?: string) {
    return this.tagsService.getTagsByFutureStatus(status);
  }
}
