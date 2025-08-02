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

@Injectable()
export class Configuration {
  app: App;
  hashing: Hashing;
  relationalDb: Database;

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
  }
}
