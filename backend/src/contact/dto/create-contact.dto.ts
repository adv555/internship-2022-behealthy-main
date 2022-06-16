import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsMobilePhone, Matches, MaxLength } from 'class-validator';

export class CreateContactDto {
  @ApiProperty({
    example: 'John',
    description:
      "Max length 64, not allowed special symbols except {space, ', -}",
  })
  @Matches(/^[a-zA-ZА-ЯҐЄІЇа-яієїґ0-9\s'-]+$/i)
  @MaxLength(64)
  readonly first_name: string;
  @ApiProperty({
    example: 'Doe',
    description:
      "Max length 64, not allowed special symbols except {space, ', -} ",
  })
  @Matches(/^[a-zA-ZА-ЯҐЄІЇа-яієїґ0-9\s'-]+$/i)
  @MaxLength(64)
  readonly last_name: string;
  @ApiProperty({
    example: 'Relative',
    enum: ['Relative', 'Friend', 'Colleague', 'Parent', 'Other'],
    description:
      "One of : 'Relative', 'Friend', 'Colleague', 'Parent', 'Other'",
  })
  @IsIn(['Relative', 'Friend', 'Colleague', 'Parent', 'Other'])
  readonly relation_type: string;
  @ApiProperty({
    example: '+380978696330',
    description: 'Ukrainian +380 XX XXX XX XX',
  })
  @IsMobilePhone('uk-UA', { strictMode: true })
  readonly phone: string;
  @ApiProperty({
    example: '1',
  })
  readonly patient_id: number;
}
