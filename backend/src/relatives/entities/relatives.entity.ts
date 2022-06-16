import {
  Table,
  Model,
  Column,
  ForeignKey,
  DataType,
  BelongsTo,
} from 'sequelize-typescript';
import { Patient } from 'src/patient/entities/patient.entity';
import { ApiProperty } from '@nestjs/swagger';

@Table({ tableName: 'Relatives' })
export class Relatives extends Model<Relatives> {
  @ApiProperty({ example: '1', description: 'Unique key.' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Ivan', description: 'First name relative field.' })
  @Column({ type: DataType.CHAR(50), allowNull: false })
  first_name: string;

  @ApiProperty({ example: 'Pelyh', description: 'Last name relatives field.' })
  @Column({ type: DataType.CHAR(50), allowNull: false })
  last_name: string;

  @ApiProperty({ example: 'Male', description: 'Gender relatives' })
  @Column({ type: DataType.CHAR(50), allowNull: false })
  gender: string;

  @ApiProperty({ example: '2010-03-05', description: 'Birth date.' })
  @Column({ type: DataType.DATE, allowNull: false })
  birth_date: string;

  @ApiProperty({
    example: '???',
    description: 'Birth date certificate if it’s child',
  })
  @Column({ type: DataType.CHAR(50), allowNull: false })
  birth_date_certificate: string;

  @ApiProperty({
    example: 'Child',
    description: "One of 'Child', 'Grandparent', 'Other'",
  })
  @Column({
    type: DataType.ENUM,
    values: ['Child', 'Grandparent', 'Other'],
    allowNull: false,
  })
  relative_type: string;

  @ApiProperty({ example: '1', description: 'This foreign key patients' })
  @ForeignKey(() => Patient)
  @Column({ type: DataType.INTEGER, allowNull: false })
  patient_id: number;

  @BelongsTo(() => Patient)
  patient: Patient;
}
