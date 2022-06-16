import { Inject, Injectable } from '@nestjs/common';
import { REPOSITORY } from 'src/constants';
import { Relatives } from './entities/relatives.entity';
import { UpdateRelativesDto } from './dto/update-relatives.dto';
import { CreateRelativesDto } from './dto/create-relatives.dto';

@Injectable()
export class RelativesService {
  constructor(
    @Inject(REPOSITORY.RELATIVES) private relativesRepository: typeof Relatives,
  ) {}

  async getAllRelativesToByIdPatient(id: number) {
    return await this.relativesRepository.findAll({
      where: { patient_id: id },
    });
  }

  async getItemRelativesToById(id: number) {
    return await this.relativesRepository.findOne({ where: { id: id } });
  }

  async createRelative(createRelativesDto: CreateRelativesDto) {
    return await this.relativesRepository.create(createRelativesDto);
  }

  async updateRelative(id: number, updateRelativesDto: UpdateRelativesDto) {
    return await this.relativesRepository.update(updateRelativesDto, {
      where: { id: id },
      returning: true,
    });
  }

  async deleteItemRelative(id: number) {
    return await this.relativesRepository.destroy({ where: { id: id } });
  }
}
