import { ApiProperty } from '@nestjs/swagger';

export class CreateDocumentDto {
  @ApiProperty({
    example: 'http://g-docs.com/my-passport.jpg',
    description: 'Url link with scan document.',
  })
  readonly scan: string;

  @ApiProperty({
    example: 'image/jpeg',
    description: 'This field with type document description.',
  })
  readonly type: string;

  @ApiProperty({
    example: '1',
    description: 'This field with foreign key user.',
  })
  readonly user_id: number;
}
