import { UserType } from '@/domain/entity';
import {
  AddNewUserUseCaseParams,
  GetUserByDocumentRepository,
  GetUserByEmailRepository,
  SaveUserRepository,
} from '../type';
import { HashingService, IdGeneratorService } from '../type/service';
import { AddNewUserUseCase } from './add-new-user.use-case';
import { FieldsValidator } from '../../shared/util';

describe('AddNewUserUseCase', () => {
  let sut: AddNewUserUseCase;
  let getUserByEmailRepository: GetUserByEmailRepository;
  let getUserByDocumentRepository: GetUserByDocumentRepository;
  let saveUserRepository: SaveUserRepository;
  let hashingService: HashingService;
  let idGeneratorService: IdGeneratorService;

  beforeEach(() => {
    getUserByDocumentRepository = {
      getByDocument: jest.fn().mockResolvedValue(null),
    };
    getUserByEmailRepository = {
      getByEmail: jest.fn().mockResolvedValue(null),
    };
    saveUserRepository = {
      save: jest.fn().mockResolvedValue({}),
    };
    hashingService = {
      hash: jest.fn().mockResolvedValue('hashed-value'),
    };
    idGeneratorService = {
      generate: jest.fn().mockReturnValue('new-id'),
    };

    jest
      .spyOn(FieldsValidator, 'validate')
      .mockResolvedValue({ valid: true, errors: [] });

    sut = new AddNewUserUseCase(
      getUserByDocumentRepository,
      getUserByEmailRepository,
      saveUserRepository,
      hashingService,
      idGeneratorService,
    );
  });

  it('should create an user successfully', async () => {
    const params: AddNewUserUseCaseParams = {
      full_name: 'Test M. Junior',
      document: '12365423468',
      email: 'test.m.jr@fake.com',
      password: 'weak-password',
      type: UserType.common,
    };

    const result = await sut.execute(params);

    expect(result.success).toBe(true);
    expect(result.data).toBeTruthy();
  });
});
