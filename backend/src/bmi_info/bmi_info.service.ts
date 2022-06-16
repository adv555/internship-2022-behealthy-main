import { Inject, Injectable } from '@nestjs/common';
import { REPOSITORY } from 'src/constants';
import { Patient } from 'src/patient/entities/patient.entity';
import { CreateBmiInfoDto } from './dto/create_bmi_info.dto';
import { UpdateBmiInfoDto } from './dto/update_bmi_info.dto';
import { BmiInfo } from './entities/bmi_info.entity';

@Injectable()
export class BmiInfoService {
  constructor(
    @Inject(REPOSITORY.BMI_INFO)
    private bmiInfoRepository: typeof BmiInfo,
  ) {}

  async create(createBmiInfoDto: CreateBmiInfoDto) {
    return await this.bmiInfoRepository.create(createBmiInfoDto);
  }
  async findAll() {
    return this.bmiInfoRepository.findAll({
      include: [{ model: Patient }],
    });
  }

  async findOne(id: number) {
    return this.bmiInfoRepository.findOne({
      where: {
        id,
      },
      include: [{ model: Patient }],
    });
  }

  async findByPatientId(patient_id: number) {
    return this.bmiInfoRepository.findOne({
      where: {
        patient_id,
      },
    });
  }

  async update(id: number, data: UpdateBmiInfoDto) {
    return await this.bmiInfoRepository.update(
      { ...data },
      { where: { id }, returning: true },
    );
  }
  async delete(id: number) {
    return await this.bmiInfoRepository.destroy({
      where: { id },
    });
  }
}
