import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

class App {
  port: number;
  basePath: string;
}

class Hashing {
  rounds: number;
}

@Injectable()
export class Configuration {
  app: App;
  hashing: Hashing;

  constructor(private readonly configService: ConfigService) {
    this.app = {
      port: Number(this.configService.get('PORT') ?? 3000),
      basePath: this.configService.get('APP_BASE_PATH') ?? 'api',
    };
    this.hashing = {
      rounds: Number(this.configService.get('HASH_ROUNDS') ?? 10),
    };
  }
}
