import { PartialType } from '@nestjs/mapped-types';
import { CreateFamilyPractitionerDto } from './create-family-practitioner.dto';
import {
  IsEnum,
  IsMobilePhone,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsOver18 } from 'src/custom-validatiors/IsOver18';

export class UpdateFamilyPractitionerDto extends PartialType(
  CreateFamilyPractitionerDto,
) {
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
  first_name?: string;

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
  last_name?: string;

  @ApiProperty({
    example: 'Woman',
    description: 'Family Practitioner gender field',
  })
  @IsNotEmpty()
  @IsEnum(['Male', 'Female', 'Other'], {
    message: "Gender can be only 'Female', 'Male' or 'Other' ",
  })
  gender?: string;

  @ApiProperty({
    example: '+380999999999',
    description: 'Family Practitioner phone field',
  })
  @IsNotEmpty()
  @IsMobilePhone('uk-UA', { strictMode: true })
  phone?: string;

  @ApiProperty({
    example: '1986-05-10',
    description: 'Family Practitioner birth date field',
  })
  @IsNotEmpty()
  @Matches(/^\d{4}[./-]\d{1,2}[./-]\d{1,2}$/, {
    message: 'Date have to be in YYYY-MM-DD, YYYY/MM/DD or YYYY.MM.DD formats',
  })
  @IsOver18()
  birthdate?: string;
}
