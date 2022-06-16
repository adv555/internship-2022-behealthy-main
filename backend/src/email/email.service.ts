import { MailerService } from '@nestjs-modules/mailer';
import {
  Inject,
  Injectable,
  UnauthorizedException,
  forwardRef,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { EmailActiveDto } from './dto/email-actinated-recipient.dto';

@Injectable()
export class EmailService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
    private mailerService: MailerService,
  ) {}

  async sendConfirmationEmail(email: string): Promise<any> {
    const user = await this.userService.findByEmail(email);

    if (!user) throw new UnauthorizedException(`User doesn't exist`);

    await this.userService.update(user.id, {
      isActivated: false,
    });

    return this.mailerService.sendMail({
      to: user.email,
      from: process.env.MAIL_USER,
      subject: 'Restore password',
      html: `<p>Follow link to restore your password: <a href="http://localhost:${process.env.BACKEND_PORT}/api/v1/auth/restore-password/${user.activationLink}">${user.activationLink}</a></p>`,
    });
  }

  async sendActivationEmail(recipientDto: EmailActiveDto): Promise<any> {
    const user = await this.userService.findByEmail(recipientDto.email);

    if (!user) throw new UnauthorizedException(`User doesn't exist`);

    return this.mailerService.sendMail({
      to: recipientDto.email,
      from: process.env.MAIL_USER,
      subject: 'Activate your account',
      html: `<p>Follow link to activate your account: <a href="http://localhost:${process.env.BACKEND_PORT}/api/v1/auth/activate/${recipientDto.activationLink}">${recipientDto.activationLink}</a></p>`,
    });
  }

  async sendUpdateEmail(id: number): Promise<any> {
    const user = await this.userService.findOne(id);

    if (!user) throw new UnauthorizedException(`User doesn't exist`);

    return this.mailerService.sendMail({
      to: user.email,
      from: process.env.MAIL_USER,
      subject: 'Activate your account',
      html: `<p>Follow link to activate your account: <a href="http://localhost:${process.env.BACKEND_PORT}/api/v1/auth/update-email/${user.activationLink}">${user.activationLink}</a></p>`,
    });
  }
}
