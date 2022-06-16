import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';

import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Patient } from './entities/patient.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwtAuth.guard';

@ApiTags('Patient')
@UseGuards(JwtAuthGuard)
@Controller('patient')
export class PatientController {
  constructor(private patientService: PatientService) {}

  @Get()
  @ApiOperation({ summary: 'Get patient by user id.' })
  @ApiOkResponse({
    description:
      'Patient with specified user id has been successfully returned',
    type: Patient,
  })
  getPatientByUserId(@Query('user_id') id: number) {
    return this.patientService.getPatientByUserId(id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get patient by id.' })
  @ApiOkResponse({
    description: 'Patient with specified id has been successfully returned',
    type: Patient,
  })
  getPatient(@Param('id') id: number) {
    return this.patientService.getPatient(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create new patient.' })
  @ApiBody({ type: Patient })
  @ApiCreatedResponse({
    description: 'New patient has been successfully created',
    type: Patient,
  })
  createPatient(@Body() createPatientDto: CreatePatientDto) {
    return this.patientService.createPatient(createPatientDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update patient by id.' })
  @ApiBody({ type: Patient })
  @ApiOkResponse({
    description: 'Patient with specified id has been successfully updated',
    type: Patient,
  })
  updatePatient(
    @Param('id') id: number,
    @Body() updatePatientDto: UpdatePatientDto,
  ) {
    return this.patientService.updatePatient(id, updatePatientDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove patient by id.' })
  @ApiOkResponse({
    description: 'Patient with specified id has been successfully removed',
    type: Patient,
  })
  deletePatient(@Param('id') id: number) {
    return this.patientService.deletePatient(id);
  }
}
