import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { EducationController } from './education.controller';
import { educationProvider } from './education.provider';
import { EducationService } from './education.service';

@Module({
  imports: [UserModule],
  controllers: [EducationController],
  providers: [EducationService, educationProvider],
})
export class EducationModule {}
