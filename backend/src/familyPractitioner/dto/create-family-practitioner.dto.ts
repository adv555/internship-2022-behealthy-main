import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsInt,
  IsMobilePhone,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';
import { IsOver18 } from '../../custom-validatiors/IsOver18';

export class CreateFamilyPractitionerDto {
  @ApiProperty({
    example: 'Iryna',
    description: 'Family Practitioner first name field',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(64)
  @Matches(/^[\da-zA-Zа-яієёА-ЯІЄЁ'-\s]*$/, {
    message:
      "First name have to contain only letters and ',' '-' and ' ' characters ",
  })
  readonly first_name: string;

  @ApiProperty({
    example: 'Bondarenko',
    description: 'Family Practitioner first name field',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(64)
  @Matches(/^[\da-zA-Zа-яієёА-ЯІЄЁ'-\s]*$/, {
    message:
      "Last name have to contain only letters and ',' '-' and ' ' characters ",
  })
  readonly last_name: string;

  @ApiProperty({
    example: 'Woman',
    description: 'Family Practitioner gender field',
  })
  @IsNotEmpty()
  @IsEnum(['Male', 'Female', 'Other'], {
    message: "Gender can be only 'Female', 'Male' or 'Other' ",
  })
  readonly gender: string;

  @ApiProperty({
    example: '+380999999999',
    description: 'Family Practitioner phone field',
  })
  @IsNotEmpty()
  @IsMobilePhone('uk-UA', { strictMode: true })
  readonly phone: string;

  @ApiProperty({
    example: '1986-05-10',
    description: 'Family Practitioner birth date field',
  })
  @IsNotEmpty()
  @Matches(/^\d{4}[./-]\d{1,2}[./-]\d{1,2}$/, {
    message: 'Date have to be in YYYY-MM-DD, YYYY/MM/DD or YYYY.MM.DD formats',
  })
  @IsOver18()
  readonly birthdate: string;

  @ApiProperty({
    example: '1',
    description: 'User id field',
  })
  @IsNotEmpty()
  @IsInt()
  readonly user_id: number;
}
