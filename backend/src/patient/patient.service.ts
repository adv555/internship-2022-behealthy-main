import { BmiInfo } from './../bmi_info/entities/bmi_info.entity';
import { Contact } from 'src/contact/entities/contact.entity';
import { MedicalInfo } from 'src/medical_info/entities/medical_info.entity';
import { Inject, Injectable } from '@nestjs/common';
import { REPOSITORY } from 'src/constants';
import { Patient } from './entities/patient.entity';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { CreatePatientDto } from './dto/create-patient.dto';
import { Declarations } from 'src/declarations/entities/declarations.entity';
import { Relatives } from 'src/relatives/entities/relatives.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class PatientService {
  constructor(
    @Inject(REPOSITORY.PATIENT) private patientRepository: typeof Patient,
  ) {}

  async getPatient(id: number) {
    return await this.patientRepository.findOne({
      where: { id: id },
      include: [
        { model: MedicalInfo },
        { model: Relatives },
        { model: Contact },
        { model: BmiInfo },
        {
          model: User,
          attributes: {
            exclude: [
              'email',
              'password',
              'role',
              'google_id',
              'activationLink',
              'isActivated',
              'createdAt',
              'updatedAt',
            ],
          },
        },
      ],
    });
  }

  async getPatientByUserId(id: number) {
    return await this.patientRepository.findOne({
      where: { user_id: id },
      include: [
        {
          model: Declarations,
        },

        { model: MedicalInfo },
        { model: Relatives },
        { model: Contact },
        { model: BmiInfo },
      ],
    });
  }

  async createPatient(createPatientDto: CreatePatientDto) {
    return await this.patientRepository.create(createPatientDto);
  }

  async updatePatient(id: number, updatePatientDto: UpdatePatientDto) {
    return await this.patientRepository.update(updatePatientDto, {
      where: { id: id },
    });
  }

  async deletePatient(id: number) {
    return await this.patientRepository.destroy({
      where: { id: id },
    });
  }
}
