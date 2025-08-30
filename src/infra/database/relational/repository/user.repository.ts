import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Credentials, UserRepository } from '@/application/type';
import { User } from '@/domain/entity';
import { UserModel } from '../model';
import { RelationalUserMapper } from '../mapper';

@Injectable()
export class RelationalUserRepository implements UserRepository {
  constructor(
    @InjectRepository(UserModel)
    private repository: Repository<UserModel>,
  ) {}

  async getByDocument(document: string): Promise<User | null> {
    const user = await this.repository.findOne({
      where: {
        document,
      },
    });

    return user ? RelationalUserMapper.toDomain(user) : null;
  }

  async getByEmail(email: string): Promise<User | null> {
    const user = await this.repository.findOne({
      where: {
        email,
      },
    });

    return user ? RelationalUserMapper.toDomain(user) : null;
  }

  async save(user: User): Promise<User> {
    const newUser = this.repository.create(user);
    const createdUser = await this.repository.save(newUser);
    return createdUser ? RelationalUserMapper.toDomain(createdUser) : null;
  }

  async getCredentials(email: string): Promise<Credentials> {
    const credentials = await this.repository.findOne({
      where: {
        email,
      },
      select: {
        id: true,
        email: true,
        password: true,
      },
    });

    if (!credentials) return null;

    return {
      id: credentials.id,
      email: credentials.email,
      password: credentials.password,
    };
  }
}
