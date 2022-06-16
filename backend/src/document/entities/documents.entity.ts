import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';

@Table({ tableName: 'Documents' })
export class Documents extends Model<Documents> {
  @ApiProperty({ example: '1', description: 'Unique primary key field' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'http://g-docs.com/my-passport.jpg',
    description: 'Url link with scan document.',
  })
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  scan: string;

  @ApiProperty({
    example: 'image/jpeg',
    description: 'This field with type document description.',
  })
  @Column({
    type: DataType.CHAR(50),
    allowNull: false,
  })
  type: string;

  @ApiProperty({
    example: '1',
    description: 'This field with foreign key user.',
  })
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  user_id: number;

  @BelongsTo(() => User)
  user: User;
}
