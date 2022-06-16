import { Inject, Injectable } from '@nestjs/common';
import { Visit } from './entities/visit.entity';
import { CreateVisitDto } from './dto/create-visit.dto';
import { UpdateVisitDto } from './dto/update-visit.dto';
import { REPOSITORY } from 'src/constants';

@Injectable()
export class VisitService {
  constructor(
    @Inject(REPOSITORY.VISIT) private visitRepository: typeof Visit,
  ) {}

  async getAllVisitPatientToDeclaration(id: number) {
    return await this.visitRepository.findAll({
      where: { declaration_id: id },
    });
  }

  async getItemVisitPatientToId(id: number) {
    return await this.visitRepository.findOne({ where: { id: id } });
  }

  async createVisitPatient(createVisitDto: CreateVisitDto) {
    return await this.visitRepository.create(createVisitDto);
  }

  async updateVisitPatient(id: number, updateVisitDto: UpdateVisitDto) {
    return await this.visitRepository.update(updateVisitDto, {
      where: { id: id },
      returning: true,
    });
  }

  async deleteVisitPatient(id: number) {
    return await this.visitRepository.destroy({ where: { id: id } });
  }
}
