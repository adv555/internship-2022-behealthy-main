import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { InsuranceController } from './insurance.controller';
import { insuranceProvider } from './insurance.provider';
import { InsuranceService } from './insurance.service';

@Module({
  imports: [UserModule],
  controllers: [InsuranceController],
  providers: [InsuranceService, insuranceProvider],
})
export class InsuranceModule {}
