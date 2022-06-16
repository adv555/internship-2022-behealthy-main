import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/user/entities/user.entity';

@Table({ tableName: 'notification_settings' })
export class NotificationSettings extends Model<NotificationSettings> {
  @ApiProperty({
    example: 1,
    description: 'Unique notification settings id',
  })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: true,
    description: 'Allow by user to receive upcoming visits notifications',
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  upcoming_visits: boolean;

  @ApiProperty({
    example: true,
    description: 'Allow by user to receive cancel declaration notifications',
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  cancel_declaration: boolean;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    unique: true,
  })
  user_id: number;

  @BelongsTo(() => User)
  user: User;
}
