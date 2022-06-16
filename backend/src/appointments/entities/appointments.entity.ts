import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Declarations } from 'src/declarations/entities/declarations.entity';
import { FamilyPractitioner } from '../../familyPractitioner/entities/familyPractitioner';
import { Patient } from '../../patient/entities/patient.entity';

@Table({ tableName: 'Appointments' })
export class Appointment extends Model<Appointment> {
  @ApiProperty({ example: 1, description: 'Unique key.' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Jane Dow', description: 'Patient name' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  patient_name: string;

  @ApiProperty({
    example: 'Online',
    description: 'Type of appointment',
  })
  @Column({
    type: DataType.ENUM,
    values: ['Online', 'Offline'],
    allowNull: false,
  })
  type: string;

  @ApiProperty({
    example: '30',
    description: 'Duration of the appointment',
  })
  @Column({
    type: DataType.ENUM,
    values: ['30', '60'],
    allowNull: false,
  })
  duration: string;

  @ApiProperty({
    example: '2020-01-01T09:00:00.000Z',
    description: 'Start time of the appointment',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  start_time: string;

  @ApiProperty({
    example: '2020-01-01T10:00:00.000Z',
    description: 'End time of the appointment',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  end_time: string;

  @ApiProperty({
    example: 1,
    description: 'This foreign key declarations.',
  })
  @ForeignKey(() => Declarations)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declaration_id: number;

  @ApiProperty({
    example: 1,
    description: 'This foreign key family practitioner.',
  })
  @ForeignKey(() => FamilyPractitioner)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  family_practitioner_id: number;

  @ApiProperty({
    example: 1,
    description: 'This foreign key patient.',
  })
  @ForeignKey(() => Patient)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  patient_id: number;

  @BelongsTo(() => Declarations, {
    onDelete: 'CASCADE',
  })
  declarations: Declarations;
  @BelongsTo(() => Patient, {
    onDelete: 'CASCADE',
  })
  patient: Patient;

  @BelongsTo(() => FamilyPractitioner, {
    onDelete: 'CASCADE',
  })
  family_practitioner: FamilyPractitioner;
}
