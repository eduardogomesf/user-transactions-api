import { hash } from 'bcrypt';
import { HashingService } from '@/application/type/service';
import { Configuration } from '@/shared/configuration';

export class BcryptHashingService implements HashingService {
  constructor(private readonly configs: Configuration) {}

  async hash(value: string): Promise<string> {
    return await hash(value, this.configs.hashing.rounds);
  }
}
