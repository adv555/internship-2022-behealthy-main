import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Patient } from '../../patient/entities/patient.entity';
import { FamilyPractitioner } from '../../familyPractitioner/entities/familyPractitioner';
import { ChatMessage } from '../../chat-message/entities/chat-message.entity';
import { ApiProperty } from '@nestjs/swagger';

@Table({ tableName: 'Chat' })
export class Chat extends Model<Chat> {
  @ApiProperty({
    example: '2',
    description: 'Patient id field',
  })
  @ForeignKey(() => Patient)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  patient_id: number;

  @ApiProperty({
    example: '1',
    description: 'Family practitioner id',
  })
  @ForeignKey(() => FamilyPractitioner)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  family_practitioner_id: number;

  @ApiProperty({
    example: 'true',
    description: 'Chat status field',
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
    allowNull: false,
  })
  is_active: boolean;

  @HasMany(() => ChatMessage)
  messages: ChatMessage[];
  @BelongsTo(() => FamilyPractitioner, {
    onDelete: 'CASCADE',
  })
  familyPractitioner: FamilyPractitioner;
  @BelongsTo(() => Patient, {
    onDelete: 'CASCADE',
  })
  patient: Patient;
}
