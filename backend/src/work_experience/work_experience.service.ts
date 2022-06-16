import { Inject, Injectable } from '@nestjs/common';
import { WorkExperience } from './entities/work_experience.entity';
import { REPOSITORY } from 'src/constants';
import { UpdateWorkExperienceDto } from './dto/update-work_experience.dto';
import { CreateWorkExperienceDto } from './dto/create-work_experience.dto';

@Injectable()
export class WorkExperienceService {
  constructor(
    @Inject(REPOSITORY.WORK_EXPERIENCE)
    private workExperienceRepository: typeof WorkExperience,
  ) {}

  async getAllWorkExperience(id: number) {
    return await this.workExperienceRepository.findAll({
      where: { family_practitioner_id: id },
    });
  }

  async getItemWorkExperience(id: number) {
    return await this.workExperienceRepository.findOne({ where: { id: id } });
  }

  async createWorkExperience(createWorkExperienceDto: CreateWorkExperienceDto) {
    return await this.workExperienceRepository.create(createWorkExperienceDto);
  }

  async updateWorkExperience(
    id: number,
    updateWorkExperienceDto: UpdateWorkExperienceDto,
  ) {
    return await this.workExperienceRepository.update(updateWorkExperienceDto, {
      where: { id: id },
      returning: true,
    });
  }

  async deleteItemWorkExperience(id: number) {
    return await this.workExperienceRepository.destroy({ where: { id: id } });
  }
}
