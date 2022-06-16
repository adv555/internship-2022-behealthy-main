import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Patient } from '../../patient/entities/patient.entity';

@Table({ tableName: 'Vaccines' })
export class Vaccines extends Model<Vaccines> {
  @ApiProperty({ example: '1', description: 'Unique key.' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'Pfizer',
    description: 'Name Vaccine',
  })
  @Column({
    type: DataType.CHAR(50),
    allowNull: false,
  })
  vaccine_name: string;

  @ApiProperty({
    example:
      'Ingredients in the original Pfizer-BioNTech COVID-19 vaccine for people ages 12 years and older ...',
    description: 'Full description about vaccines',
  })
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  description: string;

  @ApiProperty({
    example: '1',
    description: 'This foreign key patients',
  })
  @ForeignKey(() => Patient)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  patient_id: number;

  @BelongsTo(() => Patient)
  patient: Patient;
}
