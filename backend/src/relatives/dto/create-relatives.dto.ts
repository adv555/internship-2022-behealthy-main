import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsInt, IsNotEmpty, Matches, MaxLength } from 'class-validator';

export class CreateRelativesDto {
  @ApiProperty({ example: 'Ivan', description: 'First name relative field.' })
  @Matches(/^[a-zA-Z0-9'\-\ ]+$/i)
  @MaxLength(64)
  readonly first_name: string;

  @ApiProperty({ example: 'Pelyh', description: 'Last name relatives.' })
  @Matches(/^[a-zA-Z0-9'\-\ ]+$/i)
  @MaxLength(64)
  readonly last_name: string;

  @ApiProperty({
    example: 'Male',
    description: "One of 'Male', 'Female', 'Other'",
  })
  @IsIn(['Male', 'Female', 'Other'])
  readonly gender: string;

  @ApiProperty({ example: '2010-03-05', description: 'Birth date.' })
  @IsNotEmpty()
  @Matches(/^\d{4}[./-]\d{1,2}[./-]\d{1,2}$/, {
    message: 'Date have to be in YYYY-MM-DD, YYYY/MM/DD or YYYY.MM.DD formats',
  })
  readonly birth_date: string;

  @ApiProperty({
    example: '???',
    description: 'Birth date certificate if it`s child',
  })
  readonly birth_date_certificate: string;

  @ApiProperty({
    example: 'Child',
    description: "One of 'Child', 'Grandparent', 'Other'",
  })
  @IsIn(['Child', 'Grandparent', 'Other'])
  readonly relative_type: string;

  @ApiProperty({ example: '1', description: 'This foreign key patients' })
  @IsNotEmpty()
  @IsInt()
  readonly patient_id: number;
}
