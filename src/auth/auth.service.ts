import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './types/user';
import { AuthCredentialDTO } from './dto/user.dto';
import { JwtService } from '@nestjs/jwt';
import { JWtPayload } from './strategy/jwt.interface';
import * as bcrypt from 'bcrypt';
import { UserSchema } from './schema/user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}
  async singIn(
    authCredentialDTO: AuthCredentialDTO,
  ): Promise<{ accessToken: string }> {
    const { username, password } = authCredentialDTO;
    const user = await this.userModel.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JWtPayload = { username: user.username };
      const accessToken = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Please check your login credential');
    }
  }

  async register(authCredential: AuthCredentialDTO): Promise<void> {
    const { username, password } = authCredential;
    const salt = await bcrypt.genSalt();
    const hashedPassowrd = await bcrypt.hash(password, salt);

    const user = new this.userModel({
      username,
      password: hashedPassowrd,
    });
    try {
      await user.save();
    } catch (error) {
      console.log('error linea duplicada');
      console.log(error);
    }
  }
  async getOneUser(username: string): Promise<User> {
    return await this.userModel.findOne({ username });
  }

  async renewToken(username: string): Promise<{ accessToken: string }> {
    const payload: JWtPayload = { username };
    const accessToken = await this.jwtService.sign(payload);
    return { accessToken };
  }
}
