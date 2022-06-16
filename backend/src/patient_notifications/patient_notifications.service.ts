import { Inject, Injectable } from '@nestjs/common';
import { REPOSITORY } from 'src/constants';
import { CreatePatientNotificationsDto } from './dto/create_patient_notifications.dto';
import { UpdatePatientNotificationsDto } from './dto/update_patient_notifications.dto';
import { PatientNotifications } from './entities/patient_notifications.entity';

@Injectable()
export class PatientNotificationsService {
  constructor(
    @Inject(REPOSITORY.NOTIFICATION_SETTINGS)
    private repository: typeof PatientNotifications,
  ) {}

  async create(createDto: CreatePatientNotificationsDto) {
    return await this.repository.create(createDto);
  }

  async getAllEntities() {
    return await this.repository.findAll();
  }

  async getEntityByPatientId(patient_id: number) {
    return await this.repository.findOne({
      where: { patient_id },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });
  }

  async update(id: number, updateDto: UpdatePatientNotificationsDto) {
    await this.repository.update(updateDto, { where: { id } });

    return await this.repository.findOne({
      where: { id },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });
  }

  async delete(id: number) {
    return await this.repository.destroy({ where: { id } });
  }
}
