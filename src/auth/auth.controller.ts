import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialDTO } from './dto/user.dto';
import { GetUser } from './decorator/getUser.decorator';
import { User } from './entities/user.entity';
import { AuthGuard } from '@nestjs/passport';

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

  @UseGuards(AuthGuard('jwt'))
  @Get('/renew')
  async renewToken(@GetUser() user: User) {
    return await this.authService.renewToken(user.username);
  }
}
