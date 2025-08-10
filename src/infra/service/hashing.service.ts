import { compare, hash } from 'bcrypt';
import { HashingService } from '@/application/type/service';
import { Configuration } from '@/shared/configuration';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BcryptHashingService implements HashingService {
  constructor(private readonly configs: Configuration) {}

  async hash(value: string): Promise<string> {
    return await hash(value, this.configs.hashing.rounds);
  }

  async compare(value: string, hashedValue: string): Promise<boolean> {
    return await compare(value, hashedValue);
  }
}
