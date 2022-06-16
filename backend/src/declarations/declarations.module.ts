import { declarationsProvider } from './declarations.provader';
import { Module } from '@nestjs/common';
import { DeclarationsController } from './declarations.controller';
import { DeclarationsService } from './declarations.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [DeclarationsController],
  providers: [DeclarationsService, declarationsProvider],
})
export class DeclarationsModule {}
