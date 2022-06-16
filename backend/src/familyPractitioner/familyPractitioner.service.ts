import { Inject, Injectable } from '@nestjs/common';
import { REPOSITORY } from 'src/constants';
import { FamilyPractitioner } from './entities/familyPractitioner';
import { CreateFamilyPractitionerDto } from './dto/create-family-practitioner.dto';
import { UpdateFamilyPractitionerDto } from './dto/update-family-practitioner.dto';
import { WorkExperience } from 'src/work_experience/entities/work_experience.entity';
import { Education } from 'src/education/entities/education.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class FamilyPractitionerService {
  constructor(
    @Inject(REPOSITORY.FAMILY_PRACTITIONER)
    private familyPractitionerRepository: typeof FamilyPractitioner,
  ) {}

  async create(createFamilyPractitionerDto: CreateFamilyPractitionerDto) {
    return this.familyPractitionerRepository.create(
      createFamilyPractitionerDto,
    );
  }

  async findAll(): Promise<FamilyPractitioner[]> {
    return await this.familyPractitionerRepository.findAll({
      include: [
        {
          model: WorkExperience,
        },
        {
          model: Education,
        },
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

  async findOne(id: number) {
    return await this.familyPractitionerRepository.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ['updatedAt', 'createdAt'],
      },
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
        {
          model: WorkExperience,
        },
        {
          model: Education,
        },
      ],
    });
  }

  async findByUserId(id: number) {
    return await this.familyPractitionerRepository.findOne({
      where: {
        user_id: id,
      },
      attributes: {
        exclude: ['updatedAt', 'createdAt'],
      },
    });
  }

  async update(
    id: number,
    updateFamilyPractitionerDto: UpdateFamilyPractitionerDto,
  ) {
    const entity = await this.findOne(id);
    return await entity.update(updateFamilyPractitionerDto);
  }

  async remove(id: number): Promise<void> {
    await this.familyPractitionerRepository.destroy({ where: { id } });
  }
}
