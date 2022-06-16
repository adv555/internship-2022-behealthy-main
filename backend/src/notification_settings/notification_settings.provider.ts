import { REPOSITORY } from 'src/constants';
import { NotificationSettings } from './entities/notification_settings.entity';

export const notificationSettingsProvider = {
  provide: REPOSITORY.NOTIFICATION_SETTINGS,
  useValue: NotificationSettings,
};
