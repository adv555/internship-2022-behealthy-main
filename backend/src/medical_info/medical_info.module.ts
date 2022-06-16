import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { MedicalInfoController } from './medical_info.controller';
import { medicalInfoProvider } from './medical_info.provider';
import { MedicalInfoService } from './medical_info.service';

@Module({
  imports: [UserModule],
  controllers: [MedicalInfoController],
  providers: [MedicalInfoService, medicalInfoProvider],
})
export class MedicalInfoModule {}
