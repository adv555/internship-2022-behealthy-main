import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { VisitController } from './visit.controller';
import { visitProvider } from './visit.provider';
import { VisitService } from './visit.service';

@Module({
  imports: [UserModule],
  controllers: [VisitController],
  providers: [VisitService, visitProvider],
})
export class VisitModule {}
