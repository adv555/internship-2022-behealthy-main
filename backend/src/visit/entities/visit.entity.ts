import {
  Column,
  Table,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasOne,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Declarations } from 'src/declarations/entities/declarations.entity';
import { MedicalReport } from 'src/medical_report/entities/medical_report.entity';

@Table({ tableName: 'Visit' })
export class Visit extends Model<Visit> {
  @ApiProperty({ example: '1', description: 'Unique key.' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: '2022-03-10', description: 'Date visit patient' })
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  visit_date: string;

  @ApiProperty({ example: 'cancelled', description: 'Patient visit status' })
  @Column({
    type: DataType.CHAR(50),
    allowNull: false,
  })
  status: string;

  @ApiProperty({
    example: 'Sore throat',
    description: 'Short reasons pain patient',
  })
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  reason: string;

  @ApiProperty({
    example: 'Online',
    description: 'Type of visit (Online/Offline)',
  })
  @Column({
    type: DataType.CHAR(50),
    allowNull: false,
  })
  type: string;

  @ApiProperty({ example: 'http://gdrive/file1.pdf', description: '???' })
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  file: string;

  @ApiProperty({ example: '15:00:00', description: 'Patient appointment time' })
  @Column({
    type: DataType.TIME,
    allowNull: false,
  })
  time: string;

  @ApiProperty({ example: '15', description: 'Duration visit patient.' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  duration: number;

  @ApiProperty({ example: '68', description: 'Primary key with declaration' })
  @ForeignKey(() => Declarations)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declaration_id: number;

  @BelongsTo(() => Declarations)
  declarations: Declarations;
  @HasOne(() => MedicalReport)
  medical_report: MedicalReport;
}
