import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwtAuth.guard';
import { CreatePatientNotificationsDto } from './dto/create_patient_notifications.dto';
import { UpdatePatientNotificationsDto } from './dto/update_patient_notifications.dto';
import { PatientNotifications } from './entities/patient_notifications.entity';
import { PatientNotificationsService } from './patient_notifications.service';

@ApiTags('Patient notifications')
@UseGuards(JwtAuthGuard)
@Controller('patient-notifications')
export class PatientNotificationsController {
  constructor(private service: PatientNotificationsService) {}

  @ApiOperation({
    description: 'Get all patient notifications',
  })
  @ApiOkResponse({
    description: 'Returned an array of patient notifications',
    type: [PatientNotifications],
  })
  @Get()
  async getAllEntities() {
    return await this.service.getAllEntities();
  }

  @ApiOperation({
    description: 'Get one notification settings by user ID',
  })
  @ApiOkResponse({
    description: 'Returned a user notification settings',
    type: PatientNotifications,
  })
  @Get(':id')
  async getEntityByPatientId(@Param('id') id: string) {
    return await this.service.getEntityByPatientId(+id);
  }

  @ApiOperation({
    description: 'Create a user notification settings',
  })
  @ApiOkResponse({
    description: 'Returned a user notification settings',
    type: PatientNotifications,
  })
  @Post()
  async create(@Body() createDto: CreatePatientNotificationsDto) {
    return await this.service.create(createDto);
  }

  @ApiOperation({
    description: 'Update a user notification settings',
  })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdatePatientNotificationsDto,
  ) {
    return await this.service.update(+id, updateDto);
  }

  @ApiOperation({
    description: 'Delete a user notification settings',
  })
  @Delete(':id')
  async deleteNotificationSettings(@Param('id') id: string) {
    return await this.service.delete(+id);
  }
}
