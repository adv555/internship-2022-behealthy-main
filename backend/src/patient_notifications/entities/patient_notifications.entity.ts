import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Patient } from 'src/patient/entities/patient.entity';

@Table({ tableName: 'patient_notifications' })
export class PatientNotifications extends Model<PatientNotifications> {
  @ApiProperty({
    example: 1,
    description: 'Unique patient notification id',
  })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: true,
    description: 'Allow by patient to receive upcoming visits notifications',
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  visits: boolean;

  @ApiProperty({
    example: true,
    description: 'Allow by patient to receive recommendations',
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  recommendations: boolean;

  @ApiProperty({
    example: true,
    description: 'Allow by patient to receive reminders to fill in data',
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  reminders: boolean;

  @ApiProperty({
    example: true,
    description:
      'Allow by patient to receive propositions to terminate declaration from the family practitioner',
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  propositions: boolean;

  @ApiProperty({
    example: '1',
    description: "Patient's id field",
  })
  @ForeignKey(() => Patient)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    unique: true,
  })
  patient_id: number;

  @BelongsTo(() => Patient)
  patient: Patient;
}
