import { Injectable } from '@nestjs/common';
import { FutureStatus } from './future-status.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class FutureStatusService {
  constructor(
    @InjectModel(FutureStatus)
    private futureStatusRepository: typeof FutureStatus,
  ) {}

  async getStatusByName(name: string) {
    const status = await this.futureStatusRepository.findOne({
      where: { name },
    });

    if (!status) {
      throw new Error('Не найдено');
    }

    return status;
  }

  async createStatus(name: string) {
    const status = await this.futureStatusRepository.create({ name });
    return status;
  }
}
