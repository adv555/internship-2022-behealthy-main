import { ApiProperty } from '@nestjs/swagger';
import {
  IsIn,
  IsInt,
  IsMobilePhone,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  NotContains,
} from 'class-validator';

export class CreateWorkExperienceDto {
  @ApiProperty({
    example: 'Ukraine',
    description: 'The name of the country where the job was located',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(256)
  readonly country: string;

  @ApiProperty({ example: '2015-10-15', description: 'Date start work.' })
  @Matches(/^\d{4}[./-]\d{1,2}[./-]\d{1,2}$/, {
    message: 'Date have to be in YYYY-MM-DD, YYYY/MM/DD or YYYY.MM.DD formats',
  })
  readonly date_from: string;

  @ApiProperty({ example: '2020-03-10', description: 'Date end work.' })
  @IsOptional()
  @Matches(/^\d{4}[./-]\d{1,2}[./-]\d{1,2}$/, {
    message: 'Date have to be in YYYY-MM-DD, YYYY/MM/DD or YYYY.MM.DD formats',
  })
  readonly date_to: string | null;

  @ApiProperty({ example: 'Boris', description: 'Clinic name.' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  readonly clinic_name: string;

  @ApiProperty({
    example: 'Private',
    description: 'Type clinic private | state',
  })
  @IsNotEmpty()
  @IsIn(['Private', 'State', 'Other'])
  readonly clinic_type: string;

  @ApiProperty({
    example: 'street Velyka Vasylkivska, 55A, Kiev',
    description: 'Address clinic',
  })
  @IsString()
  @MaxLength(256)
  @NotContains('<')
  @NotContains('>')
  readonly clinic_address: string;

  @ApiProperty({
    example: '+380978696330',
    description: 'Ukrainian +380 XX XXX XX XX',
  })
  @IsMobilePhone('uk-UA', { strictMode: true })
  readonly phone: string;

  @IsNotEmpty()
  readonly position: string;

  @ApiProperty({
    example: '1',
    description: 'Primary key with family practitioner.',
  })
  @IsNotEmpty()
  @IsInt()
  readonly family_practitioner_id: number;
}
