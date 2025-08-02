import { v7 as uuid } from 'uuid';
import { IdGeneratorService } from '@/application/type/service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GlobalIdGenerator implements IdGeneratorService {
  generate(): string {
    return uuid();
  }
}
