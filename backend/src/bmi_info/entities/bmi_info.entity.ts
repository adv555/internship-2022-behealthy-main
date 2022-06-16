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

@Table({ tableName: 'bmi_info' })
export class BmiInfo extends Model<BmiInfo> {
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

  @ForeignKey(() => Patient)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  patient_id: number;

  @BelongsTo(() => Patient)
  patient: Patient;
}
