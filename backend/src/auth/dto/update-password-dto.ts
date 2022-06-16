import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Matches } from 'class-validator';

export class UpdatePasswordDto {
  @ApiProperty({
    example: 'Qwerty@12345',
    description: 'Old user password.',
  })
  @IsNotEmpty()
  readonly old: string;

  @ApiProperty({
    example: 'Asdfgh@67890',
    description: 'New user password.',
  })
  @Matches(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()])(?=.*[a-zA-Z]).{8,64}$/,
    {
      message:
        'Password is too weak, it have to be 8 to 64 symbols, contain an uppercase letter, ' +
        'a lowercase letter, a number and a special character',
    },
  )
  readonly new: string;
}
