import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Patient } from '../../patient/entities/patient.entity';

@Table({ tableName: 'Insurance' })
export class Insurance extends Model<Insurance> {
  @ApiProperty({ example: 1, description: 'Unique primary key for insurance' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 2, description: 'this is foreign key' })
  @ForeignKey(() => Patient)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  patients_id: number;

  @ApiProperty({ example: 6, description: 'Number of insurance' })
  @Column({
    type: DataType.INTEGER,
  })
  number_of_insurance: number;

  @ApiProperty({
    example: 'some name',
    description: 'name of insurance company',
  })
  @Column({
    type: DataType.CHAR(50),
  })
  insurance_company: string;

  @ApiProperty({
    example: 'name program',
    description: 'name of insurance program',
  })
  @Column({
    type: DataType.CHAR(50),
  })
  name_program: string;

  @ApiProperty({ example: 5, description: 'duration of insurance' })
  @Column({
    type: DataType.INTEGER,
  })
  duration: number;

  @ApiProperty({
    example: '2022/5/25',
    description: 'date of sign insurance',
  })
  @Column({
    type: DataType.DATE,
  })
  date_of_signing: Date;

  @ApiProperty({ example: '+380248776521', description: 'contact phone' })
  @Column({
    type: DataType.CHAR(50),
  })
  contact_center_phone: string;

  @ApiProperty({ example: 'store/insurance/file', description: 'path to file' })
  @Column({
    type: DataType.TEXT,
  })
  files: string;
}
