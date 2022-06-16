import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsInt, IsIn } from 'class-validator';

export class CreateDeclarationDto {
  @ApiProperty({
    example: 'ACTIVE',
    description: 'Status of the declaration',
  })
  @IsIn(['ACTIVE', 'INACTIVE', 'REQUESTED', 'REJECTED'])
  @IsNotEmpty()
  readonly status: string;

  @ApiProperty({
    example: 1,
    description: 'This foreign key patients.',
  })
  @IsNotEmpty()
  @IsInt()
  readonly patient_id: number;

  @ApiProperty({
    example: 2,
    description: 'This foreign key family_practitioners.',
  })
  @IsNotEmpty()
  @IsInt()
  readonly family_practitioner_id: number;
}
