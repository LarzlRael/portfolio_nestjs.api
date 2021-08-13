import { Injectable } from '@nestjs/common';
import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Response, Request } from 'express';

@Injectable()
export class AuthorizationMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    if (req.header['auth'] == 'contraseña') {
      next();
    }
    res.json({
      ok: false,
      msg: 'ingrese su contraseña',
    });
  }
}
