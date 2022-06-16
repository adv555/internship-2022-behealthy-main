import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, NotContains } from 'class-validator';

export class CreateVaccinesDto {
  @ApiProperty({
    example: 'Pfizer',
    description: 'Name Vaccine',
  })
  @IsNotEmpty()
  @MaxLength(256)
  @NotContains('<', {
    message:
      'Have not to contain > and < characters and should contain less than 256 symbols',
  })
  @NotContains('>', {
    message:
      'Have not to contain > and < characters and should contain less than 256 symbols',
  })
  readonly vaccine_name: string;

  @ApiProperty({
    example:
      'Ingredients in the original Pfizer-BioNTech COVID-19 vaccine for people ages 12 years and older ...',
    description: 'Full description about vaccines',
  })
  @IsNotEmpty()
  @MaxLength(1000)
  @NotContains('<', {
    message:
      'Have not to contain > and < characters and should contain less than 256 symbols',
  })
  @NotContains('>', {
    message:
      'Have not to contain > and < characters and should contain less than 256 symbols',
  })
  readonly description: string;

  @ApiProperty({
    example: '1',
    description: 'This foreign key patients',
  })
  @IsNotEmpty()
  readonly patient_id: number;
}
