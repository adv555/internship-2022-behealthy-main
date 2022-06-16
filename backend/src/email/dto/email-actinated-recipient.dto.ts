import { EmailRecipientDto } from './email-recipient-dto';

export class EmailActiveDto extends EmailRecipientDto {
  activationLink: string;
}
