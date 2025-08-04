import { GenericContainer, StartedTestContainer } from 'testcontainers';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { v7 as uuid } from 'uuid';
import { UserModel } from '../model';
import { RelationalUserRepository } from './user.repository';
import { User, UserType } from '@/domain/entity';

describe('UserRepository', () => {
  let container: StartedTestContainer;
  let userRepository: RelationalUserRepository;

  beforeAll(async () => {
    const genericContainer = new GenericContainer('postgres:9.6');
    container = await genericContainer
      .withExposedPorts(5432)
      .withEnvironment({
        POSTGRES_USER: 'test',
        POSTGRES_PASSWORD: 'test',
        POSTGRES_DB: 'test_db',
      })
      .start();

    const connectionConfigs = {
      type: 'postgres',
      host: container.getHost(),
      port: container.getMappedPort(5432),
      username: 'test',
      password: 'test',
      database: 'test_db',
      entities: [UserModel],
    };

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          ...connectionConfigs,
          synchronize: true,
        } as TypeOrmModuleOptions),
        TypeOrmModule.forFeature([UserModel]),
      ],
      providers: [RelationalUserRepository],
    }).compile();

    userRepository = module.get<RelationalUserRepository>(
      RelationalUserRepository,
    );
  }, 60000);

  afterAll(async () => {
    await container.stop();
  });

  it('should add an user successfully', async () => {
    const user: User = {
      id: uuid(),
      full_name: 'Test for User',
      document: '11122233340',
      email: 'test@test.com',
      password: 'test-password',
      type: UserType.common,
      created_at: new Date(),
    };

    const createdUser = await userRepository.save(user);

    expect(createdUser).toBeDefined();
    expect(createdUser.id).toBe(user.id);
    expect(createdUser.full_name).toBe(user.full_name);
    expect(createdUser.document).toBe(user.document);
    expect(createdUser.email).toBe(user.email);
    expect(createdUser.password).toBe('');
    expect(createdUser.type).toBe(user.type);
    expect(createdUser.created_at).toStrictEqual(user.created_at);
  });

  it('should get an user by email', async () => {
    const user: User = {
      id: uuid(),
      full_name: 'Test for User',
      document: '11122233341',
      email: 'test1@test.com',
      password: 'test-password',
      type: UserType.common,
      created_at: new Date(),
    };

    await userRepository.save(user);

    const userByEmail = await userRepository.getByEmail(user.email);

    expect(userByEmail).toBeDefined();
    expect(userByEmail.id).toBe(user.id);
    expect(userByEmail.full_name).toBe(user.full_name);
    expect(userByEmail.document).toBe(user.document);
    expect(userByEmail.email).toBe(user.email);
    expect(userByEmail.password).toBe('');
    expect(userByEmail.type).toBe(user.type);
    expect(userByEmail.created_at).toStrictEqual(user.created_at);
  });

  it('should not get a non-existing user by email', async () => {
    const user: User = {
      id: uuid(),
      full_name: 'Test for User',
      document: '11122233341',
      email: 'wrong-email@test.com',
      password: 'test-password',
      type: UserType.common,
      created_at: new Date(),
    };

    const userByEmail = await userRepository.getByEmail(user.email);

    expect(userByEmail).toBeNull();
  });

  it('should get an user by document', async () => {
    const user: User = {
      id: uuid(),
      full_name: 'Test for User',
      document: '11122233342',
      email: 'test2@test.com',
      password: 'test-password',
      type: UserType.common,
      created_at: new Date(),
    };

    await userRepository.save(user);

    const userByDocument = await userRepository.getByDocument(user.document);

    expect(userByDocument).toBeDefined();
    expect(userByDocument.id).toBe(user.id);
    expect(userByDocument.full_name).toBe(user.full_name);
    expect(userByDocument.document).toBe(user.document);
    expect(userByDocument.email).toBe(user.email);
    expect(userByDocument.password).toBe('');
    expect(userByDocument.type).toBe(user.type);
    expect(userByDocument.created_at).toStrictEqual(user.created_at);
  });

  it('should not get a non-existing user by document', async () => {
    const user: User = {
      id: uuid(),
      full_name: 'Test for User',
      document: '11122233300',
      email: 'test3@test.com',
      password: 'test-password',
      type: UserType.common,
      created_at: new Date(),
    };

    const userByDocument = await userRepository.getByDocument(user.document);

    expect(userByDocument).toBeNull();
  });
});
