import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwtAuth.guard';
import { CreateMedicalReportDto } from './dto/create-medical_report.dto';
import { UpdateMedicalReportDto } from './dto/update-medical_info.dto';
import { MedicalReport } from './entities/medical_report.entity';
import { MedicalReportService } from './medical_report.service';

@ApiTags('MedicalReport')
@UseGuards(JwtAuthGuard)
@Controller('medical_report')
export class MedicalReportController {
  constructor(private readonly medicalReportService: MedicalReportService) {}

  @ApiOperation({ summary: 'Create a new medical report.' })
  @ApiBody({ type: CreateMedicalReportDto })
  @ApiCreatedResponse({
    description: 'Report has been successfully created.',
    type: MedicalReport,
  })
  @Post()
  create(@Body() data: CreateMedicalReportDto) {
    return this.medicalReportService.create(data);
  }

  @Get()
  @ApiOperation({ summary: 'Get a medical report for specific visit' })
  @ApiOkResponse({
    description: 'Report has been successfully returned',
    type: MedicalReport,
  })
  findByVisitId(@Query('visit_id') id: number) {
    return this.medicalReportService.findByVisitId(id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get report by id.' })
  @ApiOkResponse({
    description: 'Report with specified id have been successfully returned',
    type: MedicalReport,
  })
  findOne(@Param('id') id: number) {
    return this.medicalReportService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update partially report by id.' })
  @ApiBody({ type: UpdateMedicalReportDto })
  @ApiOkResponse({
    description: 'Report with specified id has been successfully updated',
    type: MedicalReport,
  })
  update(@Param('id') id: number, @Body() data: UpdateMedicalReportDto) {
    return this.medicalReportService.update(id, data);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Replace report by id.' })
  @ApiBody({ type: CreateMedicalReportDto })
  @ApiOkResponse({
    description: 'Report with specified id has been successfully replaced',
    type: MedicalReport,
  })
  replace(@Param('id') id: number, @Body() data: CreateMedicalReportDto) {
    return this.medicalReportService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove report by id.' })
  @ApiOkResponse({
    description: 'Report with specified id has been successfully removed',
    type: MedicalReport,
  })
  remove(@Param('id') id: number) {
    return this.medicalReportService.delete(id);
  }
}
