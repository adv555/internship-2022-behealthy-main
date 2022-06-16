import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreatePatientNotificationsDto } from './create_patient_notifications.dto';

export class UpdatePatientNotificationsDto extends PartialType(
  CreatePatientNotificationsDto,
) {
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
}
