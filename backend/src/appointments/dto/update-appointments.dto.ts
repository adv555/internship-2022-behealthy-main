import { PartialType } from '@nestjs/swagger';
import { CreateAppointmentDto } from './create-appointments.dto';

export class UpdateAppointmentDto extends PartialType(CreateAppointmentDto) {}
