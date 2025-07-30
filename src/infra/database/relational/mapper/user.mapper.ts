import { User } from '@/domain/entity';
import { UserModel } from '../model';

export class RelationalUserMapper {
  static toDomain(userModel: UserModel, hidePassword = true): User {
    return {
      id: userModel.id,
      full_name: userModel.full_name,
      document: userModel.document,
      email: userModel.email,
      password: hidePassword ? '' : userModel.password,
      type: userModel.type,
      created_at: userModel.created_at,
    };
  }
}
