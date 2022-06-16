import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';
import { IsBetween100YearsAgoAndNow } from '../../custom-validatiors/IsBetween100YearsAgoAndNow';

export class CreateEducationDto {
  @ApiProperty({
    example: 'Ukraine',
    description: 'Country where the university is located',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(256)
  readonly country: string;

  @ApiProperty({
    example: 'NATIONAL MEDICAL UNIVERSITY NAMED AFTER O.O. WORSHIP',
    description: 'Name university',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(256)
  readonly university: string;

  @ApiProperty({
    example: 'Therapist',
    description: 'This speciality family practitioner field',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(256)
  readonly speciality: string;

  @ApiProperty({
    example: '2015-08-30',
    description: 'Start study university family practitioner field',
  })
  @Matches(/^\d{4}[./-]\d{1,2}[./-]\d{1,2}$/, {
    message: 'Date have to be in YYYY-MM-DD, YYYY/MM/DD or YYYY.MM.DD formats',
  })
  @IsBetween100YearsAgoAndNow()
  readonly date_from: Date;

  @ApiProperty({
    example: '2021-06-30',
    description: 'End study university family practitioner field',
  })
  @Matches(/^\d{4}[./-]\d{1,2}[./-]\d{1,2}$/, {
    message: 'Date have to be in YYYY-MM-DD, YYYY/MM/DD or YYYY.MM.DD formats',
  })
  @IsBetween100YearsAgoAndNow()
  readonly date_to: Date;

  @ApiProperty({
    example: '1',
    description: 'This foreign key family practitioners',
  })
  @IsNotEmpty()
  @IsInt()
  readonly family_practitioners_id: number;
}
