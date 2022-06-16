import { ApiProperty } from '@nestjs/swagger';
import { IsIn, MaxLength, NotContains } from 'class-validator';

export class CreateMedicalInfoDto {
  @ApiProperty({
    example: 'A RhD positive (A+)',
    description:
      "One of 'A RhD positive (A+)', 'A RhD negative (A-)', 'B RhD positive (B+)', 'B RhD negative (B-)', 'O RhD positive (O+)', 'O RhD negative (O-)', 'AB RhD positive (AB+)', 'AB RhD negative (AB-)'",
  })
  @IsIn([
    'A RhD positive (A+)',
    'A RhD negative (A-)',
    'B RhD positive (B+)',
    'B RhD negative (B-)',
    'O RhD positive (O+)',
    'O RhD negative (O-)',
    'AB RhD positive (AB+)',
    'AB RhD negative (AB-)',
  ])
  readonly blood_type?: string;

  @ApiProperty({
    example: 'No injuries',
    description: 'Max length 1000, not allowed <> symbols',
  })
  @NotContains('<')
  @NotContains('>')
  @MaxLength(1000)
  readonly injuries?: string;

  @ApiProperty({
    example: 'None',
    description: 'Max length 1000, not allowed <> symbols',
  })
  @NotContains('<')
  @NotContains('>')
  @MaxLength(1000)
  readonly cardio?: string;

  @ApiProperty({
    example: 'No diabetes',
    description:
      "One of 'No diabetes', 'Type 1', 'Type 2', 'Gestational diabetes'",
  })
  @IsIn(['No diabetes', 'Type 1', 'Type 2', 'Gestational diabetes'])
  readonly diabetes?: string;

  @ApiProperty({
    example: 'Non-allergic asthma',
    description:
      "One of 'No asthma', 'Non-allergic asthma','Allergic asthma','Cough-variant asthma'",
  })
  @IsIn([
    'No asthma',
    'Non-allergic asthma',
    'Allergic asthma',
    'Cough-variant asthma',
  ])
  readonly asthma?: string;

  @ApiProperty({
    example: 'No hepatitis',
    description:
      "One of 'No hepatitis', 'Hepatitis-A','Hepatitis-B','Hepatitis-C', 'Hepatitis-E'",
  })
  @IsIn([
    'No hepatitis',
    'Hepatitis-A',
    'Hepatitis-B',
    'Hepatitis-C',
    'Hepatitis-E',
  ])
  readonly viral_hepatitis?: string;

  @ApiProperty({
    example: 'No allergies',
    description: 'Max length 1000, not allowed <> symbols',
  })
  @NotContains('<')
  @NotContains('>')
  @MaxLength(1000)
  readonly allergies?: string;

  @ApiProperty({
    example: 'No drug intolerance',
    description: 'Max length 1000, not allowed <> symbols',
  })
  @NotContains('<')
  @NotContains('>')
  @MaxLength(1000)
  readonly drug_intolerance?: string;

  @ApiProperty({
    example: 'No HIV/AIDS',
    description: "One of 'No HIV/AIDS', 'HIV-1', 'HIV-2'",
  })
  @IsIn(['No HIV/AIDS', 'HIV-1', 'HIV-2'])
  readonly aids?: string;

  @ApiProperty({
    example: '1',
    description: "Patient's id field",
  })
  readonly patient_id: number;
}
