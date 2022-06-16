import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsIn,
  IsMobilePhone,
  Matches,
  MaxLength,
  NotContains,
} from 'class-validator';
import { IsBirthDateInRange } from 'src/helpers/IsBirthDateInRange';

export class CreatePatientDto {
  @ApiProperty({
    example: '1',
    description: 'User id field',
  })
  readonly user_id: number;

  @ApiProperty({
    example: 'John',
    description:
      "Max length 64, not allowed special symbols except {space, ', -}",
  })
  @Matches(/^[a-zA-ZА-ЯҐЄІЇа-яієїґ0-9\s'-]+$/i)
  @MaxLength(64)
  readonly first_name: string;

  @ApiProperty({
    example: 'Doe',
    description:
      "Max length 64, not allowed special symbols except {space, ', -}",
  })
  @Matches(/^[a-zA-ZА-ЯҐЄІЇа-яієїґ0-9\s'-]+$/i)
  @MaxLength(64)
  readonly last_name: string;

  @ApiProperty({
    example: 'Male',
    description: "One of 'Male', 'Female', 'Other'",
  })
  @IsIn(['Male', 'Female', 'Other'])
  readonly gender: string;

  @ApiProperty({
    example: '1990-12-12',
    description:
      'String in a ISO 8601 date format.Between 122 years before and 18 years before current date',
  })
  @IsBirthDateInRange()
  @IsDateString()
  readonly birthdate: Date;

  @ApiProperty({
    example: '27, Astronomichna street, Kharkiv, Ukraine',
    description: 'Max length 256, not allowed <> symbols',
  })
  @MaxLength(256)
  @NotContains('<')
  @NotContains('>')
  readonly address: string;

  @ApiProperty({
    example: '+380680881224',
    description: 'Ukrainian +380 XX XXX XX XX',
  })
  @IsMobilePhone('uk-UA', { strictMode: true })
  readonly phone: string;
}
