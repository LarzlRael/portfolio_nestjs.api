import { Module } from '@nestjs/common';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env.SMTP_SERVER,
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: process.env.USER_MAIL_SERVER,
          pass: process.env.PASS_MAIL_SERVER,
        },
      },
      defaults: {
        from: '"No Reply" <noreply@gmail.com>',
      },
    }),
  ],
  controllers: [EmailController],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
