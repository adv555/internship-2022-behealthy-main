import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { PatientController } from './patient.controller';
import { patientProvider } from './patient.provider';
import { PatientService } from './patient.service';

@Module({
  imports: [UserModule],
  controllers: [PatientController],
  providers: [PatientService, patientProvider],
})
export class PatientModule {}
