import { USER_REPOSITORY } from '@/shared/constant';
import { RelationalUserRepository } from '@/infra/database/relational/repository';

export const UserRepositoryProvider = {
  provide: USER_REPOSITORY,
  useClass: RelationalUserRepository,
};
