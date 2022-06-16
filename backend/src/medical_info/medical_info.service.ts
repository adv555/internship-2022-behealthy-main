import { Inject, Injectable } from '@nestjs/common';
import { REPOSITORY } from 'src/constants';
import { Patient } from 'src/patient/entities/patient.entity';
import { CreateMedicalInfoDto } from './dto/create-medical_info.dto';
import { UpdateMedicalInfoDto } from './dto/update-medical_info.dto';
import { MedicalInfo } from './entities/medical_info.entity';

@Injectable()
export class MedicalInfoService {
  constructor(
    @Inject(REPOSITORY.MEDICAL_INFO)
    private medicalInfoRepository: typeof MedicalInfo,
  ) {}

  async create(createMedicalInfoDto: CreateMedicalInfoDto) {
    return await this.medicalInfoRepository.create(createMedicalInfoDto);
  }
  async findAll() {
    return this.medicalInfoRepository.findAll({
      include: [{ model: Patient }],
    });
  }

  async findOne(id: number) {
    return this.medicalInfoRepository.findOne({
      where: {
        id,
      },
      include: [{ model: Patient }],
    });
  }

  async findByPatientId(patient_id: number) {
    return this.medicalInfoRepository.findOne({
      where: {
        patient_id,
      },
    });
  }

  async update(id: number, data: UpdateMedicalInfoDto) {
    return await this.medicalInfoRepository.update(
      { ...data },
      { where: { id }, returning: true },
    );
  }
  async delete(id: number) {
    return await this.medicalInfoRepository.destroy({
      where: { id },
    });
  }
}
