import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { RelativesController } from './relatives.controller';
import { relativesProvider } from './relatives.provider';
import { RelativesService } from './relatives.service';

@Module({
  imports: [UserModule],
  controllers: [RelativesController],
  providers: [RelativesService, relativesProvider],
})
export class RelativesModule {}
