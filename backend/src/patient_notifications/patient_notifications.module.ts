import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { PatientNotificationsController } from './patient_notifications.controller';
import { patientNotificationsProvider } from './patient_notifications.provider';
import { PatientNotificationsService } from './patient_notifications.service';

@Module({
  imports: [UserModule],
  controllers: [PatientNotificationsController],
  providers: [PatientNotificationsService, patientNotificationsProvider],
})
export class PatientNotificationsModule {}
