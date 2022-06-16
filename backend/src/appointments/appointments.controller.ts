import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointments.dto';
import { UpdateAppointmentDto } from './dto/update-appointments.dto';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Appointment } from './entities/appointments.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwtAuth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@ApiTags('Appointments')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new appointment.' })
  @ApiBody({ type: CreateAppointmentDto })
  @ApiCreatedResponse({
    description: 'Appointment has been successfully created',
    type: Appointment,
  })
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentsService.create(createAppointmentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all appointments.' })
  @ApiOkResponse({
    description: 'Appointments have been successfully returned',
    type: Appointment,
  })
  findAll() {
    return this.appointmentsService.findAll();
  }

  @Get('declaration/:id')
  @ApiOperation({ summary: 'Get declaration for specific appointment' })
  @ApiOkResponse({
    description: 'Declaration has been successfully returned',
    type: Appointment,
  })
  findByDeclarationId(@Param('id') id: number) {
    return this.appointmentsService.findByDeclarationId(id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get appointment by id.' })
  @ApiOkResponse({
    description:
      'Appointment with specified id have been successfully returned',
    type: Appointment,
  })
  findOne(@Param('id') id: number) {
    return this.appointmentsService.findOne(id);
  }

  @Get('practitioner/:id')
  @ApiOperation({ summary: 'Get appointments for specific practitioner' })
  @ApiOkResponse({
    description: 'Appointments have been successfully returned',
    type: Appointment,
  })
  @Patch(':id')
  @ApiOperation({ summary: 'Update appointment by id.' })
  @ApiBody({ type: UpdateAppointmentDto })
  @ApiOkResponse({
    description: 'Appointment with specified id have been successfully updated',
    type: Appointment,
  })
  update(@Param('id') id: number, @Body() data: UpdateAppointmentDto) {
    return this.appointmentsService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete appointment by id.' })
  @ApiOkResponse({
    description: 'Appointment with specified id have been successfully deleted',
    type: Appointment,
  })
  delete(@Param('id') id: number) {
    return this.appointmentsService.delete(id);
  }
}
