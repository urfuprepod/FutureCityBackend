import { Module } from '@nestjs/common';
import { FutureStatusController } from './future-status.controller';
import { FutureStatusService } from './future-status.service';
import { FutureStatus } from './future-status.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  controllers: [FutureStatusController],
  providers: [FutureStatusService],
  imports: [SequelizeModule.forFeature([FutureStatus])],
})
export class FutureStatusModule {}
