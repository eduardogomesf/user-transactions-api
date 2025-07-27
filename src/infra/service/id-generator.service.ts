import { v7 as uuid } from 'uuid';
import { IdGeneratorService } from '@/application/type/service';

export class GlobalIdGenerator implements IdGeneratorService {
  generate(): string {
    return uuid();
  }
}
