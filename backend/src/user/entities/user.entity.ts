import { FamilyPractitioner } from 'src/familyPractitioner/entities/familyPractitioner';
import {
  Column,
  DataType,
  HasMany,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Patient } from 'src/patient/entities/patient.entity';
import { Documents } from 'src/document/entities/documents.entity';
import { NotificationSettings } from 'src/notification_settings/entities/notification_settings.entity';

interface UserCreationAttributes {
  email: string;
  password: string;
  role: string;
  google_id?: string;
  isActivated: boolean;
  activationLink: string;
}

@Table({ tableName: 'Users' })
export class User extends Model<User, UserCreationAttributes> {
  @ApiProperty({ example: '1', description: 'User id field' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'johndoe@gmail.com',
    description: 'User email field',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @ApiProperty({
    example: 'Superpass123@',
    description:
      'User password field (have to contain letters and numbers, special characters and 8 to 64 symbols)',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @ApiProperty({ example: 'PRACTITIONER', description: 'User role field' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  role: string;

  @ApiProperty({
    example: '',
    description: 'Url link with user photo.',
  })
  @Column({
    type: DataType.TEXT,
  })
  avatar: string;

  @ApiProperty({ example: '123456789', description: 'Google user id field' })
  @Column({
    type: DataType.STRING,
  })
  google_id: string;

  @ApiProperty({ example: true, description: 'User activation status field' })
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  isActivated: boolean;

  @ApiProperty({
    example: 'http://localhost:3000/api/auth/activate/',
    description: 'User activation link field',
  })
  @Column({
    type: DataType.TEXT,
    allowNull: false,
    unique: true,
  })
  activationLink: string;

  @HasOne(() => FamilyPractitioner, {
    onDelete: 'CASCADE',
  })
  familyPractitioner: FamilyPractitioner;

  @HasOne(() => Patient, {
    onDelete: 'CASCADE',
  })
  patient: Patient;

  @HasMany(() => Documents, {
    onDelete: 'CASCADE',
  })
  documents: string[];

  @HasOne(() => NotificationSettings, {
    onDelete: 'CASCADE',
  })
  notification_settings: NotificationSettings;
}
