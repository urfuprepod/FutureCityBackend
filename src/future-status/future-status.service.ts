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

  async getStatusById(id: number) {
    const status = await this.futureStatusRepository.findByPk(id);
    return status;
  }

  async createStatus(name: string) {
    const status = await this.futureStatusRepository.create({ name });
    return status;
  }

  async getAllStatuses() {
    console.log('sex')
    const statuses = await this.futureStatusRepository.findAll();
    return statuses;
  }
}
