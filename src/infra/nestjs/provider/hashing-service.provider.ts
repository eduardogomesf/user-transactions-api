import { HASHING_SERVICE } from '@/shared/constant';
import { BcryptHashingService } from '@/infra/service';

export const HashingServiceProvider = {
  provide: HASHING_SERVICE,
  useClass: BcryptHashingService,
};
