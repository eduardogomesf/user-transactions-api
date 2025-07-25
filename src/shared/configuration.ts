import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

class App {
  port: number;
  basePath: string;
}

@Injectable()
export class Configuration {
  app: App;

  constructor(private readonly configService: ConfigService) {
    this.app = {
      port: Number(this.configService.get('PORT') ?? 3000),
      basePath: this.configService.get('APP_BASE_PATH') ?? 'api',
    };
  }
}
