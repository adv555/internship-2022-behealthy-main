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
import { BmiInfoService } from './bmi_info.service';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { BmiInfo } from './entities/bmi_info.entity';
import { CreateBmiInfoDto } from './dto/create_bmi_info.dto';
import { UpdateBmiInfoDto } from './dto/update_bmi_info.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwtAuth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/role.decorator';
import { Role } from 'src/user/enums/roles.enum';

@ApiTags('Bmi parameters')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('bmi_info')
export class BmiInfoController {
  constructor(private readonly bmiInfoService: BmiInfoService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new bmi information.' })
  @ApiBody({ type: CreateBmiInfoDto })
  @ApiCreatedResponse({
    description: 'Bmi information has been successfully created',
    type: BmiInfo,
  })
  @Roles(Role.PATIENT)
  create(@Body() createBmiInfoDto: CreateBmiInfoDto) {
    return this.bmiInfoService.create(createBmiInfoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get bmi info by patient_id' })
  @ApiCreatedResponse({
    description: 'Bmi information has been successfully returned.',
    type: BmiInfo,
  })
  @Roles(Role.PATIENT)
  findByPatientId(@Query('patient_id') patient_id: number) {
    return this.bmiInfoService.findByPatientId(patient_id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get bmi info by id and return it' })
  @ApiCreatedResponse({
    description: 'Bmi information has been successfully returned',
    type: BmiInfo,
  })
  @Roles(Role.PATIENT)
  findOne(@Param('id') id: number) {
    return this.bmiInfoService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update bmi info by id.' })
  @ApiBody({ type: UpdateBmiInfoDto })
  @ApiCreatedResponse({
    description: 'Bmi information has been successfully updated',
    type: BmiInfo,
  })
  @Roles(Role.PATIENT)
  update(@Param('id') id: number, @Body() updateBmiInfoDto: UpdateBmiInfoDto) {
    return this.bmiInfoService.update(id, updateBmiInfoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove bmi info by id.' })
  @ApiOkResponse({
    description:
      'Bmi information with specified id has been successfully removed',
    type: BmiInfo,
  })
  @Roles(Role.PATIENT)
  remove(@Param('id') id: number) {
    return this.bmiInfoService.delete(id);
  }
}
