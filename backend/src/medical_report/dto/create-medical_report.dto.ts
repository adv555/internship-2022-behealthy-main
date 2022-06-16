import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Max, MaxLength, Min, NotContains } from 'class-validator';

export class CreateMedicalReportDto {
  @ApiProperty({
    example: '170',
    description: 'only numbers with range [0-350] cm',
  })
  @IsNumber()
  @Min(0)
  @Max(350)
  readonly height: number;

  @ApiProperty({
    example: '70',
    description: 'only numbers with range [0-700] kg',
  })
  @IsNumber()
  @Min(0)
  @Max(700)
  readonly weight: number;

  @ApiProperty({
    example: 'Severe leg pain',
    description: 'Max length 1000, not allowed <> symbols',
  })
  @NotContains('<')
  @NotContains('>')
  @MaxLength(1000)
  readonly complaint: string;

  @ApiProperty({
    example: '10 pushups every morning',
    description: 'Max length 1000, not allowed <> symbols',
  })
  @NotContains('<')
  @NotContains('>')
  @MaxLength(1000)
  readonly recommendation: string;

  @ApiProperty({
    example: 'Absolutely healthy',
    description: 'Max length 1000, not allowed <> symbols',
  })
  @NotContains('<')
  @NotContains('>')
  @MaxLength(1000)
  readonly conclusion: string;

  @ApiProperty({
    example: 'http://g-docs.com/my-MRI-scan.jpg',
    description: 'Link to optional documents.',
  })
  readonly file?: string;

  @ApiProperty({
    example: '1',
    description: 'Visit id field',
  })
  readonly visit_id: number;
}
