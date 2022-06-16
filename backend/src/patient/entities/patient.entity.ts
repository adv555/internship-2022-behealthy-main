import { BmiInfo } from './../../bmi_info/entities/bmi_info.entity';
import {
  Column,
  Model,
  Table,
  DataType,
  HasOne,
  HasMany,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { MedicalInfo } from 'src/medical_info/entities/medical_info.entity';
import { Relatives } from 'src/relatives/entities/relatives.entity';
import { Vaccines } from './../../vaccines/entities/vaccines.entity';
import { Contact } from 'src/contact/entities/contact.entity';
import { User } from 'src/user/entities/user.entity';
import { Declarations } from './../../declarations/entities/declarations.entity';
import { Chat } from 'src/chat/entities/chat.entity';

@Table({ tableName: 'patients' })
export class Patient extends Model<Patient> {
  @ApiProperty({ example: '1', description: 'User id field' })
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    unique: true,
    allowNull: false,
  })
  user_id: number;

  @ApiProperty({ example: 'John', description: 'Patient first name field' })
  @Column({
    type: DataType.STRING(64),
    allowNull: false,
  })
  first_name: string;

  @ApiProperty({ example: 'Doe', description: 'Patient last name field' })
  @Column({
    type: DataType.STRING(64),
    allowNull: false,
  })
  last_name: string;

  @ApiProperty({ example: 'Female', description: 'Patient gender field' })
  @Column({
    type: DataType.ENUM,
    values: ['Male', 'Female', 'Other'],
    allowNull: false,
  })
  gender: string;

  @ApiProperty({
    example: '27 Astronomichna street, Kharkiv, Ukraine',
    description: 'Patient address field',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  address: string;

  @ApiProperty({
    example: '+380680802212',
    description: 'Patient phone number field',
  })
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  phone: string;

  @ApiProperty({
    example: '2000-12-01',
    description: 'Patient birthdate field',
  })
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  birthdate: Date;

  @HasOne(() => MedicalInfo)
  medicalInfo: MedicalInfo;
  @HasOne(() => BmiInfo)
  bmiInfo: BmiInfo;

  @HasMany(() => Vaccines)
  vaccines: Vaccines[];
  @HasMany(() => Contact)
  contacts: Contact[];

  @HasMany(() => Relatives)
  relatives: Relatives[];
  @BelongsTo(() => User)
  public user: User;

  @HasMany(() => Declarations)
  declarations: Declarations[];
  @HasMany(() => Chat, {
    onDelete: 'CASCADE',
  })
  public chats: Chat[];
}
