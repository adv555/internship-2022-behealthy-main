import { CreateChatDto } from './dto/create-chat.dto';
import { FamilyPractitioner } from 'src/familyPractitioner/entities/familyPractitioner';
import { Patient } from 'src/patient/entities/patient.entity';
import { ChatMessage } from './../chat-message/entities/chat-message.entity';
import { Inject, Injectable } from '@nestjs/common';
import { REPOSITORY } from '../constants';
import { Chat } from './entities/chat.entity';
import { UpdateChatDto } from './dto/update-chat.dto';
import { User } from 'src/user/entities/user.entity';

const exclusionList = [
  'email',
  'password',
  'role',
  'google_id',
  'activationLink',
  'isActivated',
  'createdAt',
  'updatedAt',
];
@Injectable()
export class ChatService {
  constructor(@Inject(REPOSITORY.CHAT) private chatRepository: typeof Chat) {}
  async getAll() {
    return this.chatRepository.findAll();
  }

  async getOne(id: number) {
    return this.chatRepository.findOne({
      where: {
        id,
      },
      include: [
        { model: ChatMessage },
        {
          model: Patient,
          include: [
            {
              model: User,
              attributes: {
                exclude: exclusionList,
              },
            },
          ],
        },
        {
          model: FamilyPractitioner,
          include: [
            {
              model: User,
              attributes: {
                exclude: exclusionList,
              },
            },
          ],
        },
      ],
    });
  }

  async getOneByIds(patient_id: number, family_practitioner_id: number) {
    return this.chatRepository.findOne({
      where: {
        patient_id: patient_id,
        family_practitioner_id: family_practitioner_id,
      },
      include: [
        { model: ChatMessage },
        {
          model: Patient,
          include: [
            {
              model: User,
              attributes: {
                exclude: exclusionList,
              },
            },
          ],
        },
        {
          model: FamilyPractitioner,
          include: [
            {
              model: User,
              attributes: {
                exclude: exclusionList,
              },
            },
          ],
        },
      ],
    });
  }

  async getAllByPractitionerId(id: number, status: boolean) {
    return this.chatRepository.findAll({
      where: {
        family_practitioner_id: id,
        is_active: status,
      },
      include: [
        { model: ChatMessage },
        {
          model: Patient,
          include: [
            {
              model: User,
              attributes: {
                exclude: exclusionList,
              },
            },
          ],
        },
        {
          model: FamilyPractitioner,
          include: [
            {
              model: User,
              attributes: {
                exclude: exclusionList,
              },
            },
          ],
        },
      ],
    });
  }
  async getAllByPatientId(id: number, status: boolean) {
    return this.chatRepository.findAll({
      where: {
        patient_id: id,
        is_active: status,
      },
      include: [
        { model: ChatMessage },
        {
          model: FamilyPractitioner,
          include: [
            {
              model: User,
              attributes: {
                exclude: exclusionList,
              },
            },
          ],
        },
        {
          model: Patient,
          include: [
            {
              model: User,
              attributes: {
                exclude: exclusionList,
              },
            },
          ],
        },
      ],
    });
  }

  async create(dto: CreateChatDto) {
    return this.chatRepository.create(dto);
  }

  async update(id: number, data: UpdateChatDto) {
    return await this.chatRepository.update(
      { ...data },
      { where: { id }, returning: true },
    );
  }
}
