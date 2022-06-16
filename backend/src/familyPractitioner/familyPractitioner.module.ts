import { Module } from '@nestjs/common';
import { FamilyPractitionerController } from './familyPractitioner.controller';
import { FamilyPractitionerService } from './familyPractitioner.service';
import { familyPractitionerProvider } from './familyPractitioner.provider';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [FamilyPractitionerController],
  providers: [FamilyPractitionerService, familyPractitionerProvider],
})
export class FamilyPractitionerModule {}
