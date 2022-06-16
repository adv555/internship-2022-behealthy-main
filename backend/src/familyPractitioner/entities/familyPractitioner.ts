import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  //   PrimaryKey,
  Table,
  DataType,
  HasMany,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { WorkExperience } from 'src/work_experience/entities/work_experience.entity';
import { User } from '../../user/entities/user.entity';
import { Education } from 'src/education/entities/education.entity';
import { Declarations } from 'src/declarations/entities/declarations.entity';
import { Chat } from 'src/chat/entities/chat.entity';

@Table({ tableName: 'family_practitioners' })
export class FamilyPractitioner extends Model<FamilyPractitioner> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  public id: number;

  @ApiProperty({
    example: 'Iryna',
    description: 'Family Practitioner first name field',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  public first_name: string;

  @ApiProperty({
    example: 'Bondarenko',
    description: 'Family Practitioner first name field',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  public last_name: string;

  @ApiProperty({
    example: 'Female',
    description:
      'Family Practitioner gender field ("Male", "Female" or "Other")',
  })
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  public gender: string;

  @ApiProperty({
    example: '+380999999999',
    description: 'Family Practitioner phone field',
  })
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  public phone: string;

  @ApiProperty({
    example: '1986-05-10',
    description: 'Family Practitioner birth date field',
  })
  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
  })
  public birthdate: string;

  @ApiProperty({
    example: '1',
    description: 'User id field',
  })
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    unique: true,
    allowNull: false,
  })
  public user_id: number;

  @BelongsTo(() => User)
  public user: User;

  @HasMany(() => WorkExperience, {
    onDelete: 'CASCADE',
  })
  public workExperience: WorkExperience[];

  @HasMany(() => Education, {
    onDelete: 'CASCADE',
  })
  public education: Education[];

  @HasMany(() => Declarations, {
    onDelete: 'CASCADE',
  })
  public declarations: Declarations[];
  @HasMany(() => Chat, {
    onDelete: 'CASCADE',
  })
  public chats: Chat[];
}
