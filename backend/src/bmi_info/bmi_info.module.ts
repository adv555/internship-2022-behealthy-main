import { Module } from '@nestjs/common';
import { BmiInfoController } from './bmi_info.controller';
import { BmiInfoService } from './bmi_info.service';
import { bmiInfoProvider } from './bmi_info.provider';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [BmiInfoController],
  providers: [BmiInfoService, bmiInfoProvider],
})
export class BmiInfoModule {}
