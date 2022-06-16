import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsInt,
  IsMilitaryTime,
  IsNotEmpty,
  IsString,
  Matches,
} from 'class-validator';

export class CreateVisitDto {
  @ApiProperty({ example: '2022-03-10', description: 'Date visit patient' })
  @Matches(/^\d{4}[./-]\d{1,2}[./-]\d{1,2}$/, {
    message: 'Date have to be in YYYY-MM-DD, YYYY/MM/DD or YYYY.MM.DD formats',
  })
  readonly visit_date: string;

  @ApiProperty({ example: 'Canceled', description: 'Patient visit status' })
  @IsNotEmpty()
  @IsEnum(['Canceled', 'Assigned', 'Completed'])
  readonly status: string;

  @ApiProperty({
    example: 'Sore throat',
    description: 'Short reasons pain patient',
  })
  @IsNotEmpty()
  @IsString()
  readonly reason: string;

  @ApiProperty({
    example: 'Online',
    description: 'Type of visit (Online/offline)',
  })
  @IsNotEmpty()
  @IsEnum(['Online', 'Offline'])
  readonly type: string;

  @ApiProperty({ example: 'http://gdrive/file1.pdf', description: '???' })
  @IsNotEmpty()
  @IsString()
  readonly file: string;

  @ApiProperty({ example: '15:00', description: 'Patient appointment time' })
  @IsNotEmpty()
  @IsMilitaryTime()
  readonly time: string;

  @ApiProperty({ example: '15', description: 'Duration visit patient.' })
  @IsNotEmpty()
  @IsInt()
  readonly duration: number;

  @ApiProperty({ example: '68', description: 'Primary key with declaration' })
  @IsNotEmpty()
  @IsInt()
  readonly declaration_id: number;
}
