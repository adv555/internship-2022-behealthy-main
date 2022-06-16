import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class CreatePatientNotificationsDto {
  @ApiProperty({
    example: true,
    description: 'Allow by patient to receive upcoming visits notification',
  })
  visits?: boolean;

  @ApiProperty({
    example: true,
    description: 'Allow by patient to receive recommendations',
  })
  recommendations?: boolean;

  @ApiProperty({
    example: true,
    description: 'Allow by patient to receive reminders to fill in data',
  })
  reminders?: boolean;

  @ApiProperty({
    example: true,
    description:
      'Allow by patient to receive propositions to terminate declaration from the family practitioner',
  })
  propositions?: boolean;

  @ApiProperty({
    example: '1',
    description: 'Patient foreign key',
  })
  @IsNotEmpty()
  @IsInt()
  patient_id: number;
}
