import {
  Column,
  Table,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { FamilyPractitioner } from 'src/familyPractitioner/entities/familyPractitioner';

@Table({ tableName: 'Work_experience' })
export class WorkExperience extends Model<WorkExperience> {
  @ApiProperty({ example: '1', description: 'Unique key.' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'Ukraine',
    description: 'The name of the country where the job was located',
  })
  @Column({ type: DataType.STRING(50), allowNull: false })
  country: string;

  @ApiProperty({ example: '2015-10-15', description: 'Date start work.' })
  @Column({ type: DataType.DATEONLY, allowNull: false })
  date_from: string;

  @ApiProperty({ example: '2020-03-10', description: 'Date end work.' })
  @Column({ type: DataType.DATEONLY, allowNull: true })
  date_to: string;

  @ApiProperty({ example: 'Boris', description: 'Clinic name.' })
  @Column({ type: DataType.STRING(50), allowNull: false })
  clinic_name: string;

  @ApiProperty({
    example: 'Private',
    description: 'Type clinic private | state',
  })
  @Column({ type: DataType.STRING(50), allowNull: false })
  clinic_type: string;

  @ApiProperty({
    example: 'street Velyka Vasylkivska, 55A, Kiev',
    description: 'Address clinic',
  })
  @Column({ type: DataType.STRING(50), allowNull: false })
  clinic_address: string;

  @ApiProperty({
    example: '+380978696330',
    description: 'Ukrainian +380 XX XXX XX XX',
  })
  @Column({ type: DataType.STRING(50) })
  phone: string;

  @ApiProperty({
    example: 'Family Practitioner',
    description: 'A family Practitioner position',
  })
  @Column({ type: DataType.STRING(50), allowNull: false })
  position: string;

  @ApiProperty({
    example: '1',
    description: 'Primary key with family practitioner.',
  })
  @ForeignKey(() => FamilyPractitioner)
  @Column({ type: DataType.INTEGER, allowNull: false })
  family_practitioner_id: number;

  @BelongsTo(() => FamilyPractitioner, {
    onDelete: 'CASCADE',
  })
  familyPractitioner: FamilyPractitioner;
}
