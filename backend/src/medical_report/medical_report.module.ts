import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { MedicalReportController } from './medical_report.controller';
import { medicalReportProvider } from './medical_report.provider';
import { MedicalReportService } from './medical_report.service';

@Module({
  imports: [UserModule],
  controllers: [MedicalReportController],
  providers: [MedicalReportService, medicalReportProvider],
})
export class MedicalReportModule {}
