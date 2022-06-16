import { Inject, Injectable } from '@nestjs/common';
import { REPOSITORY } from 'src/constants';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { Contact } from './entities/contact.entity';

@Injectable()
export class ContactService {
  constructor(
    @Inject(REPOSITORY.CONTACT)
    private contactRepository: typeof Contact,
  ) {}

  async create(data: CreateContactDto) {
    return await this.contactRepository.create(data);
  }
  async findAll() {
    return this.contactRepository.findAll();
  }

  async findOne(id: number) {
    return this.contactRepository.findOne({
      where: {
        id,
      },
    });
  }

  async findAllByPatientId(patient_id: number) {
    return this.contactRepository.findAll({
      where: {
        patient_id,
      },
    });
  }

  async update(id: number, data: UpdateContactDto) {
    return await this.contactRepository.update(
      { ...data },
      { where: { id }, returning: true },
    );
  }
  async delete(id: number) {
    return await this.contactRepository.destroy({
      where: { id },
    });
  }
}
