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

@Table({ tableName: 'contacts' })
export class Contact extends Model<Contact> {
  @ApiProperty({
    example: 'John',
    description:
      "Max length 64, not allowed special symbols except {space, ', -}",
  })
  @Column({
    type: DataType.STRING(64),
    allowNull: false,
  })
  first_name: string;

  @ApiProperty({
    example: 'Doe',
    description:
      "Max length 64, not allowed special symbols except {space, ', -} ",
  })
  @Column({
    type: DataType.STRING(64),
    allowNull: false,
  })
  last_name: string;

  @ApiProperty({
    example: 'Relative',
    enum: ['Relative', 'Friend', 'Colleague', 'Parent', 'Other'],
    description:
      "One of : 'Relative', 'Friend', 'Colleague', 'Parent', 'Other'",
  })
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  relation_type: string;

  @ApiProperty({
    example: '+380978696330',
    description: 'Ukrainian +380 XX XXX XX XX',
  })
  @Column({
    type: DataType.STRING(50),
  })
  phone: string;

  @ApiProperty({
    example: '1',
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
