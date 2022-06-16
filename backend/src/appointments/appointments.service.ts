import { Inject, Injectable } from '@nestjs/common';
import { REPOSITORY } from 'src/constants';
import { CreateAppointmentDto } from './dto/create-appointments.dto';
import { UpdateAppointmentDto } from './dto/update-appointments.dto';
import { Appointment } from './entities/appointments.entity';
import { Declarations } from '../declarations/entities/declarations.entity';

@Injectable()
export class AppointmentsService {
  constructor(
    @Inject(REPOSITORY.APPOINTMENTS)
    private appointmentRepository: typeof Appointment,
  ) {}

  async create(data: CreateAppointmentDto) {
    return await this.appointmentRepository.create(data);
  }
  async findAll() {
    return this.appointmentRepository.findAll({
      include: [
        {
          model: Declarations,
        },
      ],
    });
  }

  async findOne(id: number) {
    return this.appointmentRepository.findOne({
      where: {
        id,
      },
      include: [
        {
          model: Declarations,
        },
      ],
    });
  }

  async findByDeclarationId(declaration_id: number) {
    return await this.appointmentRepository.findAll({
      where: {
        declaration_id,
      },
    });
  }

  async findByPractitionerId(family_practitioner_id: number) {
    return await this.appointmentRepository.findAll({
      where: {
        family_practitioner_id,
      },
    });
  }

  async update(id: number, data: UpdateAppointmentDto) {
    return await this.appointmentRepository.update(
      { ...data },
      { where: { id }, returning: true },
    );
  }
  async delete(id: number) {
    return await this.appointmentRepository.destroy({
      where: { id },
    });
  }
}
