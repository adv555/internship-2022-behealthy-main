import { Module } from '@nestjs/common';
import { vaccinesProvider } from './vaccines.provider';
import { VaccinesController } from './vaccines.controller';
import { VaccinesService } from './vaccines.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [VaccinesController],
  providers: [VaccinesService, vaccinesProvider],
})
export class VaccinesModule {}
