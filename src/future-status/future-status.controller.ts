import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { FutureStatusService } from './future-status.service';

@Controller('status')
export class FutureStatusController {
  constructor(private readonly futureStatusService: FutureStatusService) {}

  // @Get('/:name')
  // async getStatusByName(@Param('name') name: string) {
  //   return this.futureStatusService.getStatusByName(name);
  // }

  @Post('/create')
  async createStatus(@Body('name') name: string) {
    return this.futureStatusService.createStatus(name);
  }

  @Get('/find/:id')
  async getStatusById(@Param('id') id: number) {
    return this.futureStatusService.getStatusById(id);
  }

  @Get('/all')
  async getAllStatuses() {
    return this.futureStatusService.getAllStatuses();
  }
}
