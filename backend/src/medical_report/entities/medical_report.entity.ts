import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Visit } from 'src/visit/entities/visit.entity';

@Table({ tableName: 'medical_reports' })
export class MedicalReport extends Model<MedicalReport> {
  @ApiProperty({
    example: '170',
    description: "Patient's height field",
  })
  @Column({
    type: DataType.INTEGER,
  })
  height: number;

  @ApiProperty({
    example: '70',
    description: "Patient's weight field",
  })
  @Column({
    type: DataType.INTEGER,
  })
  weight: number;

  @ApiProperty({
    example: 'Severe leg pain',
    description: "Patient's complaint field",
  })
  @Column({
    type: DataType.STRING(1000),
    allowNull: true,
  })
  complaint: string;

  @ApiProperty({
    example: '10 pushups every morning',
    description: "Doctor's recommendation field",
  })
  @Column({
    type: DataType.STRING(1000),
    allowNull: true,
  })
  recommendation: string;

  @ApiProperty({
    example: 'Blunt trauma',
    description: "Doctor's conclusion field",
  })
  @Column({
    type: DataType.STRING(1000),
    allowNull: true,
  })
  conclusion: string;

  @ApiProperty({
    example: 'http://g-docs.com/my-MRI-scan.jpg',
    description: 'Link to optional documents.',
  })
  @Column({
    type: DataType.STRING(1000),
    allowNull: false,
  })
  file: string;

  @ApiProperty({
    example: '1',
  })
  @ForeignKey(() => Visit)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  visit_id: number;

  @BelongsTo(() => Visit)
  visit: Visit;
}
