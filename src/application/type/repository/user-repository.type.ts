import { User } from '@/domain/entity';

export interface GetUserByDocumentRepository {
  getByDocument(document: string): Promise<User | null>;
}

export interface GetUserByEmailRepository {
  getByEmail(email: string): Promise<User | null>;
}

export interface SaveUserRepository {
  save(user: User): Promise<User>;
}

export type Credentials = {
  id: string;
  email: string;
  password: string;
};

export interface GetUserCredentialsByEmailRepository {
  getCredentials(email: string): Promise<Credentials>;
}

export type UserRepository = GetUserByDocumentRepository &
  GetUserByEmailRepository &
  SaveUserRepository;
