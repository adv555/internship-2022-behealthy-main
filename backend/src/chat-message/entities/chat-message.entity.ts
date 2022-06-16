import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Chat } from '../../chat/entities/chat.entity';
import { User } from '../../user/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Table({ tableName: 'ChatMessages' })
export class ChatMessage extends Model<ChatMessage> {
  @ApiProperty({
    example: '1',
    description: 'Message id field',
  })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: '1',
    description: 'Chat id field',
  })
  @ForeignKey(() => Chat)
  @Column({
    type: DataType.INTEGER,
  })
  chat_id: number;

  @ApiProperty({
    example: '1',
    description: 'User id field',
  })
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  user_id: number;

  @ApiProperty({
    example: 'Hello',
    description: 'Message field',
  })
  @Column({
    type: DataType.TEXT,
  })
  message: string;

  @ApiProperty({
    example: 'false',
    description: 'Message is read field',
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_read: boolean;

  @ApiProperty({
    example: '/photos/image.png',
    description: 'Path to pinned files',
  })
  @Column({
    type: DataType.TEXT,
  })
  files: string;
  @BelongsTo(() => Chat)
  public chat: Chat;
}
