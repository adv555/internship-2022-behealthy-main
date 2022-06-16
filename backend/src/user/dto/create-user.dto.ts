import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, Matches } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'johndoe@gmail.com',
    description: 'User email field',
  })
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    example: 'Superpass123@',
    description:
      'User password field (have to contain letters and numbers, special characters and 8 to 64 symbols)',
  })
  @IsNotEmpty()
  @Matches(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()])(?=.*[a-zA-Z]).{8,64}$/,
    {
      message:
        'Password is too weak, it have to be 8 to 64 symbols, contain an uppercase letter, ' +
        'a lowercase letter, a number and a special character',
    },
  )
  readonly password: string;

  @ApiProperty({ example: 'PATIENT', description: 'User role field' })
  @IsNotEmpty()
  @IsEnum(['PRACTITIONER', 'PATIENT', 'ADMIN'])
  readonly role: string;
  google_id?: string;

  @ApiProperty({ example: true, description: 'User activation status field' })
  readonly isActivated: boolean;
}
