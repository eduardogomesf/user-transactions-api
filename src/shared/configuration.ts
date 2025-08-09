import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

class App {
  port: number;
  basePath: string;
}

class Hashing {
  rounds: number;
}

class Database {
  url: string;
}

class Token {
  accessToken: {
    secret: string;
    durationInSeconds: number;
  };
}

@Injectable()
export class Configuration {
  app: App;
  hashing: Hashing;
  relationalDb: Database;
  token: Token;

  constructor(private readonly configService: ConfigService) {
    this.app = {
      port: Number(this.configService.get('PORT') ?? 3000),
      basePath: this.configService.get('APP_BASE_PATH') ?? 'api',
    };
    this.hashing = {
      rounds: Number(this.configService.get('HASH_ROUNDS') ?? 10),
    };
    this.relationalDb = {
      url: this.configService.getOrThrow('DB_CONNECTION_STRING'),
    };
    this.token = {
      accessToken: {
        secret: this.configService.getOrThrow('ACCESS_TOKEN_SECRET'),
        durationInSeconds: Number(
          this.configService.get('ACCESS_TOKEN_EXPIRATION_IN_SECONDS') ?? '900',
        ),
      },
    };
  }
}
