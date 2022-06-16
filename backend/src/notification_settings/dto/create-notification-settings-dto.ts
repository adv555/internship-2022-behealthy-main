import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsNotEmpty } from 'class-validator';

export class CreateNotificationSettingsDto {
  @ApiProperty({
    example: true,
    description: 'Allow by user to receive upcoming visits notification',
  })
  readonly upcoming_visits: boolean;

  @ApiProperty({
    example: true,
    description: 'Allow by user to receive cancel declaration notifications',
  })
  readonly cancel_declaration: boolean;

  @ApiProperty({
    example: '1',
    description: 'User foreign key',
  })
  @IsNotEmpty()
  @IsInt()
  readonly user_id: number;
}
