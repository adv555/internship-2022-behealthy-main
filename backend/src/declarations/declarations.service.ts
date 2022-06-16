import { Inject, Injectable } from '@nestjs/common';
import { where } from 'sequelize/types';
import { REPOSITORY } from 'src/constants';
import { Patient } from 'src/patient/entities/patient.entity';
import { User } from 'src/user/entities/user.entity';
import { CreateDeclarationDto } from './dto/create-declarations.dto';
import { UpdateDeclarationDto } from './dto/update-declarations.dto';
import { Declarations } from './entities/declarations.entity';

@Injectable()
export class DeclarationsService {
  constructor(
    @Inject(REPOSITORY.DECLARATIONS)
    private declarationsRepository: typeof Declarations,
  ) {}

  async getAllFamilyPractitionerDeclarations(id: number) {
    return await this.declarationsRepository.findAll({
      where: { family_practitioner_id: id },
      include: [
        {
          model: Patient,
          include: [
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
        },
      ],
    });
  }

  async getDeclarationsByStatus(id: number, status: string) {
    return await this.declarationsRepository.findAll({
      where: { family_practitioner_id: id, status: status },
      include: [
        {
          model: Patient,
          include: [
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
        },
      ],
    });
  }

  async getAllPatientDeclarations(id: number) {
    return await this.declarationsRepository.findAll({
      where: { patient_id: id },
    });
  }

  async getItemDeclarations(id: number) {
    return await this.declarationsRepository.findAll({
      where: { id: id },
      include: [
        {
          model: Patient,
          include: [
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
        },
      ],
    });
  }

  async createDeclarations(createDeclarationsDto: CreateDeclarationDto) {
    const declaration = await this.declarationsRepository.findAll({
      where: {
        family_practitioner_id: createDeclarationsDto.family_practitioner_id,
        patient_id: createDeclarationsDto.patient_id,
        status: createDeclarationsDto.status,
      },
    });
    if (declaration.length > 0) {
      return {
        message: 'Declaration already exists',
      };
    } else {
      return await this.declarationsRepository.create(createDeclarationsDto);
    }
  }

  async updateDeclarations(
    id: number,
    updateDeclarationDto: UpdateDeclarationDto,
  ) {
    return await this.declarationsRepository.update(updateDeclarationDto, {
      where: { id: id },
      returning: true,
    });
  }

  async deleteDeclarations(id: number) {
    return await this.declarationsRepository.destroy({ where: { id: id } });
  }
}
