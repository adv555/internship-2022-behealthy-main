import { Visit } from './../../visit/entities/visit.entity';
import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Patient } from 'src/patient/entities/patient.entity';
import { FamilyPractitioner } from 'src/familyPractitioner/entities/familyPractitioner';

@Table({ tableName: 'Declarations' })
export class Declarations extends Model<Declarations> {
  @ApiProperty({ example: 1, description: 'Unique key.' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'REQUESTED',
    description: 'Status of the declaration',
  })
  @Column({
    type: DataType.ENUM,
    values: ['ACTIVE', 'INACTIVE', 'REQUESTED', 'REJECTED'],
    allowNull: false,
  })
  status: string;

  @ApiProperty({
    example: 1,
    description: 'This foreign key patients.',
  })
  @ForeignKey(() => Patient)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  patient_id: number;

  @ApiProperty({
    example: 2,
    description: 'This foreign key family_practitioners.',
  })
  @ForeignKey(() => FamilyPractitioner)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  family_practitioner_id: number;

  @BelongsTo(() => Patient, {
    onDelete: 'CASCADE',
  })
  patient: Patient;

  @BelongsTo(() => FamilyPractitioner, {
    onDelete: 'CASCADE',
  })
  family_practitioner: FamilyPractitioner;

  @HasMany(() => Visit, {
    onDelete: 'CASCADE',
  })
  visit: string[];
}
