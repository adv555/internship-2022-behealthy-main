import { Module } from '@nestjs/common';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { UserModule } from 'src/user/user.module';
import { DocumentController } from './document.controller';
import { DocumentService } from './document.service';
import { documentsProvider } from './documents.provider';

@Module({
  imports: [CloudinaryModule, UserModule],
  controllers: [DocumentController],
  providers: [DocumentService, documentsProvider],
})
export class DocumentModule {}
