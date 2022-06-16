import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { AppointmentsController } from './appointments.controller';
import { appointmentProvider } from './appointments.provider';
import { AppointmentsService } from './appointments.service';

@Module({
  imports: [UserModule],
  controllers: [AppointmentsController],
  providers: [AppointmentsService, appointmentProvider],
})
export class AppointmentsModule {}
