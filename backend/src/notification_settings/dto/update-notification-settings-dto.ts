import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateNotificationSettingsDto } from './create-notification-settings-dto';

export class UpdateNotificationSettingsDto extends PartialType(
  CreateNotificationSettingsDto,
) {
  @ApiProperty({
    example: true,
    description: 'Allow by user to receive upcoming visits notification',
  })
  upcoming_visits?: boolean;

  @ApiProperty({
    example: true,
    description: 'Allow by user to receive cancel declaration notifications',
  })
  cancel_declaration?: boolean;
}
