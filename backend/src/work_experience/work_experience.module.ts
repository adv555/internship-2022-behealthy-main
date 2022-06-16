import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { WorkExperienceController } from './work_experience.controller';
import { workExperienceProvider } from './work_experience.provider';
import { WorkExperienceService } from './work_experience.service';

@Module({
  imports: [UserModule],
  controllers: [WorkExperienceController],
  providers: [WorkExperienceService, workExperienceProvider],
})
export class WorkExperienceModule {}
