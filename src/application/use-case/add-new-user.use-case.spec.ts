import { UserType } from '@/domain/entity';
import {
  AddNewUserUseCaseParams,
  GetUserByDocumentRepository,
  GetUserByEmailRepository,
  SaveUserRepository,
} from '../type';
import { HashGeneratorService, IdGeneratorService } from '../type/service';
import { AddNewUserUseCase } from './add-new-user.use-case';
import { FieldsValidator } from '@/shared/util';
import { ERROR_CODES } from '@/shared/constant';

describe('AddNewUserUseCase', () => {
  let sut: AddNewUserUseCase;
  let getUserByEmailRepository: GetUserByEmailRepository;
  let getUserByDocumentRepository: GetUserByDocumentRepository;
  let saveUserRepository: SaveUserRepository;
  let hashGeneratorService: HashGeneratorService;
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
    hashGeneratorService = {
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
      hashGeneratorService,
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
    expect(idGeneratorService.generate).toHaveBeenCalledTimes(1);
    expect(hashGeneratorService.hash).toHaveBeenCalledWith('weak-password');
    expect(getUserByDocumentRepository.getByDocument).toHaveBeenCalledWith(
      '12365423468',
    );
    expect(getUserByEmailRepository.getByEmail).toHaveBeenCalledWith(
      'test.m.jr@fake.com',
    );
    expect(saveUserRepository.save).toHaveBeenCalled();
  });

  it('should not create a new user if the passed params are invalid', async () => {
    jest
      .spyOn(FieldsValidator, 'validate')
      .mockResolvedValueOnce({ valid: false, errors: [] });

    const params: AddNewUserUseCaseParams = {
      full_name: 'Test M. Junior',
      document: '12365423468',
      email: 'test.m.jr@fake.com',
      password: 'weak-password',
      type: UserType.common,
    };

    const result = await sut.execute(params);

    expect(result.success).toBe(false);
    expect(result.data).not.toBeTruthy();
    expect(result.code).toBe(ERROR_CODES.fieldValidationError);
    expect(getUserByDocumentRepository.getByDocument).not.toHaveBeenCalled();
    expect(getUserByEmailRepository.getByEmail).not.toHaveBeenCalled();
  });

  it('should not create a new user if the document is already in use', async () => {
    getUserByDocumentRepository.getByDocument = jest.fn().mockResolvedValue({});

    const params: AddNewUserUseCaseParams = {
      full_name: 'Test M. Junior',
      document: '12365423468',
      email: 'test.m.jr@fake.com',
      password: 'weak-password',
      type: UserType.common,
    };

    const result = await sut.execute(params);

    expect(result.success).toBe(false);
    expect(result.data).not.toBeTruthy();
    expect(result.code).toBe(ERROR_CODES.alreadyExists);
    expect(getUserByEmailRepository.getByEmail).not.toHaveBeenCalled();
  });

  it('should not create a new user if the email is already in use', async () => {
    getUserByEmailRepository.getByEmail = jest.fn().mockResolvedValue({});

    const params: AddNewUserUseCaseParams = {
      full_name: 'Test M. Junior',
      document: '12365423468',
      email: 'test.m.jr@fake.com',
      password: 'weak-password',
      type: UserType.common,
    };

    const result = await sut.execute(params);

    expect(result.success).toBe(false);
    expect(result.data).not.toBeTruthy();
    expect(result.code).toBe(ERROR_CODES.alreadyExists);
    expect(getUserByDocumentRepository.getByDocument).toHaveBeenCalled();
    expect(saveUserRepository.save).not.toHaveBeenCalled();
  });

  it('should pass along any thrown error', async () => {
    getUserByEmailRepository.getByEmail = jest.fn().mockImplementation(() => {
      throw new Error('any-error');
    });

    const params: AddNewUserUseCaseParams = {
      full_name: 'Test M. Junior',
      document: '12365423468',
      email: 'test.m.jr@fake.com',
      password: 'weak-password',
      type: UserType.common,
    };

    const promise = sut.execute(params);

    await expect(promise).rejects.toThrow(new Error('any-error'));
  });
});
