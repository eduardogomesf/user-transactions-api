import { sign } from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { GeneratedToken, TokenService } from '@/application/type/service';

@Injectable()
export class JwtTokenService implements TokenService {
  generate(
    id: string,
    durationInSeconds: number,
    secret: string,
    payload = {},
  ): GeneratedToken {
    const now = new Date();
    const nowInSeconds = Math.floor(now.getTime() / 1000);
    const expiresInSeconds = nowInSeconds + durationInSeconds;
    const expiresInMilliseconds = expiresInSeconds * 1000;

    const token = sign(
      {
        ...payload,
      },
      secret,
      {
        subject: id,
        expiresIn: expiresInSeconds,
      },
    );

    const expirationDate = new Date(expiresInMilliseconds).toISOString();

    return {
      token,
      expiresAt: expirationDate,
    };
  }
}
