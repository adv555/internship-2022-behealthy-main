import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Matches } from "class-validator";

export class RestoreForgottenPasswordDto {
  @ApiProperty({
    example: '98eddeae-c4b2-462b-87c9-e76d3c37c3bc',
    description: 'User password activation link id.',
  })
  @IsNotEmpty()
  readonly linkId: string;

  @ApiProperty({
    example: 'Asdfgh@67890',
    description: 'New user password.',
  })
  @Matches(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()])(?=.*[a-zA-Z]).{8,64}$/,
    {
      message:
        'Password is too weak, it have to be 8 to 64 symbols, contain an uppercase letter, ' +
        'a lowercase letter, a number and a special character',
    },
  )
  readonly password: string;
}