import { Inject, Injectable } from '@nestjs/common';
import { REPOSITORY } from 'src/constants';
import { CreateNotificationSettingsDto } from './dto/create-notification-settings-dto';
import { UpdateNotificationSettingsDto } from './dto/update-notification-settings-dto';
import { NotificationSettings } from './entities/notification_settings.entity';

@Injectable()
export class NotificationSettingsService {
  constructor(
    @Inject(REPOSITORY.NOTIFICATION_SETTINGS)
    private notificationSettingRepository: typeof NotificationSettings,
  ) {}

  async create(notificationSettingsDto: CreateNotificationSettingsDto) {
    return await this.notificationSettingRepository.create(
      notificationSettingsDto,
    );
  }

  async getAllSettings() {
    return await this.notificationSettingRepository.findAll();
  }

  async getSettingsByPractitionerId(userId: number) {
    return await this.notificationSettingRepository.findOne({
      where: {
        user_id: userId,
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    });
  }

  async update(
    id: number,
    updateNotificationSettingsDto: UpdateNotificationSettingsDto,
  ) {
    await this.notificationSettingRepository.update(
      updateNotificationSettingsDto,
      {
        where: {
          id,
        },
      },
    );

    return await this.notificationSettingRepository.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    });
  }

  async delete(id: number) {
    return await this.notificationSettingRepository.destroy({
      where: {
        id,
      },
    });
  }
}
