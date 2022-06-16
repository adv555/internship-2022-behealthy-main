import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class EmailRecipientDto {
  @ApiProperty({
    example: 'johndoe@gmail.com',
    description: 'User email field',
  })
  @IsEmail()
  readonly email: string;
}
