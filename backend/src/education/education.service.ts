import { Inject, Injectable } from '@nestjs/common';
import { REPOSITORY } from 'src/constants';
import { Education } from './entities/education.entity';
import { UpdateEducationDto } from './dto/update-education.dto';
import { CreateEducationDto } from './dto/create-education.dto';

@Injectable()
export class EducationService {
  constructor(
    @Inject(REPOSITORY.EDUCATION) private educationRepository: typeof Education,
  ) {}

  async getAllEducationFamilyPractitioners(id: number) {
    return await this.educationRepository.findAll({
      where: { family_practitioners_id: id },
      attributes: {
        exclude: ['updatedAt', 'createdAt'],
      },
    });
  }

  async getItemEducationFamilyPractitioners(id: number) {
    return await this.educationRepository.findOne({
      where: { id: id },
    });
  }

  async createEducationFamilyPractitioners(
    createEducationDto: CreateEducationDto,
  ) {
    return await this.educationRepository.create(createEducationDto);
  }

  async updateEducationFamilyPractitioners(
    id: number,
    updateEducationDto: UpdateEducationDto,
  ) {
    return await this.educationRepository.update(updateEducationDto, {
      where: { id: id },
      returning: true,
    });
  }

  async deleteItemEducationFamilyPractitioners(id: number) {
    return await this.educationRepository.destroy({
      where: { id: id },
    });
  }
}
