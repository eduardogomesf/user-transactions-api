import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Configuration } from './configuration';

@Global()
@Module({
  imports: [ConfigModule.forRoot()],
  providers: [Configuration],
  exports: [Configuration],
})
export class SharedModule {}
