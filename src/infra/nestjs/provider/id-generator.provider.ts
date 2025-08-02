import { ID_GENERATOR_SERVICE } from '@/shared/constant';
import { GlobalIdGenerator } from '@/infra/service';

export const IdGeneratorServiceProvider = {
  provide: ID_GENERATOR_SERVICE,
  useClass: GlobalIdGenerator,
};
