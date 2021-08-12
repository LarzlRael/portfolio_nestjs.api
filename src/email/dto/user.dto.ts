import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SendEmailDto {
  @IsEmail()
  from: string;

  @IsString()
  @IsNotEmpty()
  message: string;
  name: string;
}
