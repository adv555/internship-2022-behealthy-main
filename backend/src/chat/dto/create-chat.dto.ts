import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsNotEmpty, IsPositive } from 'class-validator';

export class CreateChatDto {
  @ApiProperty({
    example: '1',
    description: 'Patient id field',
  })
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  patient_id: number;

  @ApiProperty({
    example: '1',
    description: 'Family practitioner id field',
  })
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  family_practitioner_id: number;

  @ApiProperty({
    example: 'true',
    description: 'Chat status',
  })
  @IsNotEmpty()
  @IsBoolean()
  is_active: boolean;
}
