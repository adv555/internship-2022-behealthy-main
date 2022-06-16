import { UpdateDocumentDto } from './dto/update-document.dto';
import { Inject, Injectable } from '@nestjs/common';
import { REPOSITORY } from 'src/constants';
import { CreateDocumentDto } from './dto/create-document.dto';
import { Documents } from './entities/documents.entity';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class DocumentService {
  constructor(
    @Inject(CloudinaryService) private cloudinaryService: CloudinaryService,

    @Inject(REPOSITORY.DOCUMENTS) private documentRepository: typeof Documents,
  ) {}

  async getAllDocumentsOfUser(id: number) {
    return await this.documentRepository.findAll({ where: { user_id: id } });
  }

  async getItemDocumentOfUser(id: number) {
    return await this.documentRepository.findOne({ where: { id: id } });
  }

  async createDocumentToUser(createDocumentDto: CreateDocumentDto) {
    return await this.documentRepository.create(createDocumentDto);
  }

  async uploadFile(
    createDocumentDto: CreateDocumentDto,
    files: Array<Express.Multer.File>,
  ) {
    files.forEach(async (file) => {
      const result = await this.cloudinaryService.uploadImage(file);
      return await this.documentRepository.create({
        ...createDocumentDto,
        scan: result.url,
        type: file.mimetype,
      });
    });
  }

  async updateDocumentToUser(id: number, updateDocumentDto: UpdateDocumentDto) {
    return await this.documentRepository.update(updateDocumentDto, {
      where: { id: id },
      returning: true,
    });
  }

  async deleteDocumentToUser(id: number) {
    return await this.documentRepository.destroy({ where: { id: id } });
  }
}
