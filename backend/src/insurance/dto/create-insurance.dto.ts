import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsMobilePhone,
  IsNotEmpty,
  IsPositive,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';
import { IsBetween100YearsAgoAndNow } from '../../custom-validatiors/IsBetween100YearsAgoAndNow';

export class CreateInsurance {
  @ApiProperty({ example: '1', description: 'Number of insurance' })
  @IsNotEmpty()
  @IsPositive()
  @IsInt()
  readonly number_of_insurance: number;

  @ApiProperty({ example: '1', description: 'Patient id' })
  @IsNotEmpty()
  @IsInt()
  readonly patients_id: number;

  @ApiProperty({ example: 'TAS', description: 'Name of insurance company' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(256)
  readonly insurance_company: string;

  @ApiProperty({ example: 'medical', description: 'name of insurance program' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(256)
  readonly name_program: string;

  @ApiProperty({ example: '12', description: 'Insurance duration (months)' })
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  readonly duration: number;

  @ApiProperty({
    example: '2022/05/02',
    description: 'Date of signing insurance',
  })
  @Matches(/^\d{4}[./-]\d{1,2}[./-]\d{1,2}$/, {
    message: 'Date have to be in YYYY-MM-DD, YYYY/MM/DD or YYYY.MM.DD formats',
  })
  @IsBetween100YearsAgoAndNow()
  readonly date_of_signing: Date;

  @ApiProperty({ example: '+380248776521', description: 'contact phone' })
  @IsNotEmpty()
  @IsMobilePhone('uk-UA', { strictMode: true })
  readonly contact_center_phone: string;

  @ApiProperty({
    example: 'store/images/something',
    description: 'path to insurance files ',
  })
  @IsNotEmpty()
  readonly files: string;
}
