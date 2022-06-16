import { Inject, Injectable } from '@nestjs/common';
import { REPOSITORY } from 'src/constants';
import { CreateMedicalReportDto } from './dto/create-medical_report.dto';
import { UpdateMedicalReportDto } from './dto/update-medical_info.dto';
import { MedicalReport } from './entities/medical_report.entity';

@Injectable()
export class MedicalReportService {
  constructor(
    @Inject(REPOSITORY.MEDICAL_REPORT)
    private medicalReportRepository: typeof MedicalReport,
  ) {}

  async create(data: CreateMedicalReportDto) {
    return await this.medicalReportRepository.create(data);
  }
  async findAll() {
    return this.medicalReportRepository.findAll();
  }

  async findOne(id: number) {
    return this.medicalReportRepository.findOne({
      where: {
        id,
      },
    });
  }

  async findByVisitId(visit_id: number) {
    return this.medicalReportRepository.findOne({
      where: {
        visit_id,
      },
    });
  }

  async update(id: number, data: UpdateMedicalReportDto) {
    return await this.medicalReportRepository.update(
      { ...data },
      { where: { id }, returning: true },
    );
  }
  async delete(id: number) {
    return await this.medicalReportRepository.destroy({
      where: { id },
    });
  }
}
