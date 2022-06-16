import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Patient } from 'src/patient/entities/patient.entity';
import { ApiProperty } from '@nestjs/swagger';

@Table({ tableName: 'medical_info' })
export class MedicalInfo extends Model<MedicalInfo> {
  @ApiProperty({
    example: 'A RhD positive (A+)',
    description:
      "One of 'A RhD positive (A+)', 'A RhD negative (A-)', 'B RhD positive (B+)', 'B RhD negative (B-)', 'O RhD positive (O+)', 'O RhD negative (O-)', 'AB RhD positive (AB+)', 'AB RhD negative (AB-)'",
  })
  @Column({
    type: DataType.ENUM,
    values: [
      'A RhD positive (A+)',
      'A RhD negative (A-)',
      'B RhD positive (B+)',
      'B RhD negative (B-)',
      'O RhD positive (O+)',
      'O RhD negative (O-)',
      'AB RhD positive (AB+)',
      'AB RhD negative (AB-)',
    ],
    allowNull: true,
  })
  blood_type: string;

  @ApiProperty({
    example: 'No injuries',
    description: "Patient's injuries field",
  })
  @Column({
    type: DataType.STRING(1000),
    allowNull: true,
  })
  injuries: string;

  @ApiProperty({
    example: 'None',
    description: "Patient's cardio field",
  })
  @Column({
    type: DataType.STRING(1000),
    allowNull: true,
  })
  cardio: string;

  @ApiProperty({
    example: 'No diabetes',
    description: "Patient's diabetes field",
  })
  @Column({
    type: DataType.ENUM,
    values: ['No diabetes', 'Type 1', 'Type 2', 'Gestational diabetes'],
    allowNull: true,
  })
  diabetes: string;

  @ApiProperty({
    example: 'Non-allergic asthma',
    description: "Patient's asthma field",
  })
  @Column({
    type: DataType.ENUM,
    values: [
      'No asthma',
      'Non-allergic asthma',
      'Allergic asthma',
      'Cough-variant asthma',
    ],
    allowNull: true,
  })
  asthma: string;

  @ApiProperty({
    example: 'No hepatitis',
    description: "Patient's viral hepatitis field",
  })
  @Column({
    type: DataType.ENUM,
    values: [
      'No hepatitis',
      'Hepatitis-A',
      'Hepatitis-B',
      'Hepatitis-C',
      'Hepatitis-E',
    ],
  })
  viral_hepatitis: string;

  @ApiProperty({
    example: 'No allergies',
    description: "Patient's allergies field",
  })
  @Column({
    type: DataType.STRING(1000),
    allowNull: true,
  })
  allergies: string;

  @ApiProperty({
    example: 'No drug intolerance',
    description: "Patient's drug intolerance field",
  })
  @Column({
    type: DataType.STRING(1000),
    allowNull: true,
  })
  drug_intolerance: string;

  @ApiProperty({
    example: 'No HIV/AIDS',
    description: "Patient's aids field",
  })
  @Column({
    type: DataType.ENUM,
    values: ['No HIV/AIDS', 'HIV-1', 'HIV-2'],
    allowNull: true,
  })
  aids: string;

  @ApiProperty({
    example: '1',
    description: "Patient's id field",
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
