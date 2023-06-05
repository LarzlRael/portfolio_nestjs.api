import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialDTO } from './dto/user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/signup')
  signup(@Body() registerUserDTO: AuthCredentialDTO): Promise<void> {
    console.log(registerUserDTO);
    return this.authService.register(registerUserDTO);
  }

  @Post('/signin')
  @UseGuards(AuthGuard('jwt'))
  async signIn(@Body() authCredentialDTO: AuthCredentialDTO) {
    return await this.authService.singIn(authCredentialDTO);
  }
}
