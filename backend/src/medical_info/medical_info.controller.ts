import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { MedicalInfoService } from './medical_info.service';
import { CreateMedicalInfoDto } from './dto/create-medical_info.dto';
import { UpdateMedicalInfoDto } from './dto/update-medical_info.dto';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { MedicalInfo } from './entities/medical_info.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwtAuth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/role.decorator';
import { Role } from 'src/user/enums/roles.enum';

@ApiTags('Medical information')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('medical_info')
export class MedicalInfoController {
  constructor(private readonly medicalInfoService: MedicalInfoService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new medical info.' })
  @ApiBody({ type: CreateMedicalInfoDto })
  @ApiCreatedResponse({
    description: 'Medical information has been successfully created',
    type: MedicalInfo,
  })
  create(@Body() createMedicalInfoDto: CreateMedicalInfoDto) {
    return this.medicalInfoService.create(createMedicalInfoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get medical info by patient_id' })
  @ApiCreatedResponse({
    description: 'Medical information has been successfully returned.',
    type: MedicalInfo,
  })
  @Roles(Role.PATIENT)
  findByPatientId(@Query('patient_id') patient_id: number) {
    return this.medicalInfoService.findByPatientId(patient_id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get medical info by id and return it' })
  @ApiCreatedResponse({
    description: 'Medical information has been successfully returned',
    type: MedicalInfo,
  })
  @Roles(Role.PATIENT)
  findOne(@Param('id') id: number) {
    return this.medicalInfoService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update medical info by id.' })
  @ApiBody({ type: UpdateMedicalInfoDto })
  @ApiOkResponse({
    description: 'Medical info with specified id has been successfully updated',
    type: MedicalInfo,
  })
  @Roles(Role.PATIENT)
  update(
    @Param('id') id: number,
    @Body() updateMedicalInfoDto: UpdateMedicalInfoDto,
  ) {
    return this.medicalInfoService.update(id, updateMedicalInfoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove medical info by id.' })
  @ApiOkResponse({
    description: 'Medical info with specified id has been successfully removed',
    type: MedicalInfo,
  })
  @Roles(Role.PATIENT)
  remove(@Param('id') id: number) {
    return this.medicalInfoService.delete(id);
  }
}
