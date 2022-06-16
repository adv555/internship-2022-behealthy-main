import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { FamilyPractitioner } from 'src/familyPractitioner/entities/familyPractitioner';

@Table({ tableName: 'Education' })
export class Education extends Model<Education> {
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
    description: 'Country where the university is located',
  })
  @Column({
    type: DataType.STRING(50),
  })
  country: string;

  @ApiProperty({
    example: 'NATIONAL MEDICAL UNIVERSITY NAMED AFTER O.O. WORSHIP',
    description: 'Name university',
  })
  @Column({
    type: DataType.STRING(75),
  })
  university: string;

  @ApiProperty({
    example: 'Therapist',
    description: 'This speciality family practitioner field',
  })
  @Column({
    type: DataType.STRING(50),
  })
  speciality: string;

  @ApiProperty({
    example: '2015-08-30',
    description: 'Start study university family practitioner field',
  })
  @Column({
    type: DataType.DATEONLY,
  })
  date_from: Date;

  @ApiProperty({
    example: '2021-06-30',
    description: 'End study university family practitioner field',
  })
  @Column({
    type: DataType.DATEONLY,
  })
  date_to: Date;

  @ApiProperty({
    example: '1',
    description: 'This foreign key family practitioners',
  })
  @ForeignKey(() => FamilyPractitioner)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  family_practitioners_id: number;

  @BelongsTo(() => FamilyPractitioner, {
    onDelete: 'CASCADE',
  })
  familyPractitioner: FamilyPractitioner;
}
