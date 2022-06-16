import { ApiProperty } from '@nestjs/swagger';
import { MaxLength } from 'class-validator';

export class CreateChatMessageDto {
  @ApiProperty({
    example: '1',
    description: 'Chat id field',
  })
  chat_id: number;

  @ApiProperty({
    example: '1',
    description: 'User id field',
  })
  user_id: number;

  @ApiProperty({
    example: 'hello',
    description: 'Message field',
  })
  @MaxLength(3000)
  message: string;

  @ApiProperty({
    example: 'false',
    description: 'Read message indicator field',
  })
  is_read: boolean;

  @ApiProperty({
    example: '/path/asd/file.pdf',
    description: 'Path to pinned files field',
  })
  files?: string;
}
