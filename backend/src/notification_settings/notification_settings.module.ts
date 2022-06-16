import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { NotificationSettingsController } from './notification_settings.controller';
import { notificationSettingsProvider } from './notification_settings.provider';
import { NotificationSettingsService } from './notification_settings.service';

@Module({
  imports: [UserModule],
  controllers: [NotificationSettingsController],
  providers: [NotificationSettingsService, notificationSettingsProvider],
})
export class NotificationSettings {}
