import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { EmailRecipientDto } from './dto/email-recipient-dto';
import { EmailService } from './email.service';

@ApiTags('Email')
@Controller('email')
export class EmailController {
  constructor(private emailService: EmailService) {}

  @Post('confirm')
  @ApiOperation({
    summary: 'Send email with a confirmation link to a user.',
  })
  @ApiBody({ type: EmailRecipientDto })
  async sendConfirmationEmail(@Body() recipientData: EmailRecipientDto) {
    return await this.emailService.sendConfirmationEmail(recipientData.email);
  }
}
