import { Inject, Injectable } from '@nestjs/common';
import { Vaccines } from './entities/vaccines.entity';
import { REPOSITORY } from 'src/constants';
import { UpdateVaccinesDto } from './dto/update-vaccines.dto';
import { CreateVaccinesDto } from './dto/create-vaccines.dto';
import { Patient } from 'src/patient/entities/patient.entity';

@Injectable()
export class VaccinesService {
  constructor(
    @Inject(REPOSITORY.VACCINES) private vaccinesRepository: typeof Vaccines,
  ) {}

  async getAllVaccinesPatient(id: number) {
    return this.vaccinesRepository.findAll({ where: { patient_id: id } });
  }

  async getItemVaccinePatient(id: number) {
    return await this.vaccinesRepository.findOne({
      where: { id: id },
      include: [Patient],
    });
  }

  async createVaccinePatient(createVaccinesDto: CreateVaccinesDto) {
    return await this.vaccinesRepository.create(createVaccinesDto);
  }

  async updateVaccinesPatient(
    id: number,
    updateVaccinesDto: UpdateVaccinesDto,
  ) {
    return await this.vaccinesRepository.update(updateVaccinesDto, {
      where: { id: id },
      returning: true,
    });
  }

  async deleteItemVaccinesPatient(id: number) {
    return await this.vaccinesRepository.destroy({ where: { id: id } });
  }
}
