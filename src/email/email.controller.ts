import { Body, Controller, Post, Res } from '@nestjs/common';
import { SendEmailDto } from './dto/user.dto';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private emailService: EmailService) {}

  @Post()
  async sendEmail(@Res() res, @Body() sendEmailDto: SendEmailDto) {
    if (await this.emailService.sendEmailContact(sendEmailDto)) {
      res.status(200).json({
        ok: true,
        message: 'message sended',
      });
    } else {
      res.status(400).json({
        ok: true,
        message: 'error to send message',
      });
    }
  }
}
