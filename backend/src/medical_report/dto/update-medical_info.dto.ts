import { PartialType } from '@nestjs/swagger';
import { CreateMedicalReportDto } from './create-medical_report.dto';

export class UpdateMedicalReportDto extends PartialType(
  CreateMedicalReportDto,
) {}
