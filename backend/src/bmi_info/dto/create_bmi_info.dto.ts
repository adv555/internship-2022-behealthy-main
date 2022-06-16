import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Max, Min } from 'class-validator';

export class CreateBmiInfoDto {
  @ApiProperty({
    example: '170',
    description: 'only numbers with range [0-350] cm',
  })
  @IsNumber()
  @Min(0)
  @Max(350)
  readonly height?: number;

  @ApiProperty({
    example: '70',
    description: 'only numbers with range [0-700] kg',
  })
  @IsNumber()
  @Min(0)
  @Max(700)
  readonly weight?: number;

  @ApiProperty({
    example: '1',
    description: "Patient's id field",
  })
  readonly patient_id: number;
}
