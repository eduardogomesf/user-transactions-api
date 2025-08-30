import { decode, JwtPayload, sign } from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { GeneratedToken, TokenService } from '@/application/type/service';
import { Duration } from '@/shared/type';

@Injectable()
export class JwtTokenService implements TokenService {
  generate(
    id: string,
    duration: Duration,
    secret: string,
    payload = {},
  ): GeneratedToken {
    const token = sign(
      {
        ...payload,
      },
      secret,
      {
        subject: id,
        expiresIn: duration,
      },
    );

    const decoded: JwtPayload = decode(token) as JwtPayload;

    const expirationDate = new Date(decoded.exp * 1000).toISOString();

    return {
      token,
      expiresAt: expirationDate,
    };
  }
}
