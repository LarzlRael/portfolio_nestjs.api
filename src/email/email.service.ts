import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { SendEmailDto } from './dto/user.dto';

@Injectable()
export class EmailService {
  constructor(private mailService: MailerService) {}

  async sendEmailContact(sendEmailDto: SendEmailDto): Promise<boolean> {
    try {
      await this.mailService.sendMail({
        to: process.env.USER_NAME_EMAIL_RECIEVED,
        from: sendEmailDto.from,
        subject: 'Correo de contacto',
        text: `${sendEmailDto.from} ${sendEmailDto.name} Te envio este mensaje:  ${sendEmailDto.message} `,
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
