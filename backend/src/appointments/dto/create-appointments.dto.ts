import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsInt, IsIn } from 'class-validator';

export class CreateAppointmentDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'Patient name',
  })
  @IsNotEmpty()
  readonly patient_name: string;
  @ApiProperty({
    example: 'Online',
    description: 'Type of appointment',
  })
  @IsIn(['Online', 'Offline'])
  @IsNotEmpty()
  readonly type: string;

  @ApiProperty({
    example: '30',
    description: 'Duration of the appointment',
  })
  @IsIn(['30', '60'])
  @IsNotEmpty()
  readonly duration: string;

  @ApiProperty({
    example: '2020-01-01T09:00:00.000Z',
    description: 'Start time of the appointment',
  })
  @IsNotEmpty()
  readonly start_time: string;

  @ApiProperty({
    example: '2020-01-01T10:00:00.000Z',
    description: 'End time of the appointment',
  })
  @IsNotEmpty()
  readonly end_time: string;

  @ApiProperty({
    example: 1,
    description: 'This foreign key declarations.',
  })
  @IsNotEmpty()
  @IsInt()
  readonly declaration_id: number;

  @ApiProperty({
    example: 1,
    description: 'This foreign key family practitioner.',
  })
  @IsNotEmpty()
  @IsInt()
  readonly family_practitioner_id: number;

  @ApiProperty({
    example: 1,
    description: 'This foreign key patient.',
  })
  @IsNotEmpty()
  @IsInt()
  readonly patient_id: number;
}
