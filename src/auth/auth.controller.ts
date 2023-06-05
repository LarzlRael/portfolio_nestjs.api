import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialDTO } from './dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/signup')
  signup(@Body() registerUserDTO: AuthCredentialDTO) {
    return this.authService.register(registerUserDTO);
  }

  @Post('/signin')
  async signIn(@Body() authCredentialDTO: AuthCredentialDTO) {
    return await this.authService.singIn(authCredentialDTO);
  }
}
