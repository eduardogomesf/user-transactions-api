import { Configuration } from '@/shared/configuration';
import {
  CREDENTIAL_ERROR_CODES,
  CREDENTIAL_ERROR_MESSAGES,
  ERROR_CODES,
  ERROR_MESSAGES,
} from '@/shared/constant';
import { FieldsValidator } from '@/shared/util';
import { GetUserCredentialsByEmailRepository } from '../type';
import { HashComparerService, TokenGeneratorService } from '../type/service';
import { AuthenticateUserUseCase } from './authenticate-user.use-case';

describe('AuthenticateUserUseCase', () => {
  let sut: AuthenticateUserUseCase;
  let getUserCredentialsByEmailRepository: GetUserCredentialsByEmailRepository;
  let hashComparerService: HashComparerService;
  let tokenGeneratorService: TokenGeneratorService;
  let configs: Configuration;

  const tokenExpirationDate = '2025-08-10T01:06:12.497Z';

  beforeEach(() => {
    getUserCredentialsByEmailRepository = {
      getCredentials: jest.fn().mockResolvedValue({
        id: 'any-id',
        email: 'test@mail.com',
        password: 'hashed-password',
      }),
    };
    hashComparerService = {
      compare: jest.fn().mockResolvedValue(true),
    };
    tokenGeneratorService = {
      generate: jest.fn().mockReturnValue({
        token: 'valid-token',
        expiresAt: tokenExpirationDate,
      }),
    };
    configs = {
      token: {
        accessToken: {
          duration: '15m',
          secret: 'any-secret',
        },
      },
    } as unknown as Configuration;

    sut = new AuthenticateUserUseCase(
      getUserCredentialsByEmailRepository,
      hashComparerService,
      tokenGeneratorService,
      configs,
    );
  });

  it('should generate a valid token', async () => {
    const getCredentialsSpy = jest.spyOn(
      getUserCredentialsByEmailRepository,
      'getCredentials',
    );
    const compareSpy = jest.spyOn(hashComparerService, 'compare');
    const generateSpy = jest.spyOn(tokenGeneratorService, 'generate');

    const params = {
      email: 'test@mail.com',
      password: 'any-password',
    };

    const result = await sut.execute(params);

    expect(result.success).toBe(true);
    expect(result.data.token).toBe('valid-token');
    expect(result.data.expiresAt).toBe(tokenExpirationDate);
    expect(result.data.valid).toBe(true);
    expect(getCredentialsSpy).toHaveBeenCalledWith(params.email);
    expect(compareSpy).toHaveBeenCalledWith(params.password, 'hashed-password');
    expect(generateSpy).toHaveBeenCalledWith('any-id', '15m', 'any-secret');
  });

  it('should return false if provided params are invalid', async () => {
    jest.spyOn(FieldsValidator, 'validate').mockResolvedValueOnce({
      valid: false,
      errors: [],
    });

    const result = await sut.execute({} as any);

    expect(result.success).toBe(false);
    expect(result.data).toBeNull();
    expect(result.code).toBe(ERROR_CODES.fieldValidationError);
  });

  it('should not generate token if email is invalid', async () => {
    getUserCredentialsByEmailRepository.getCredentials = jest
      .fn()
      .mockResolvedValue(null);

    const result = await sut.execute({
      email: 'invalid-test@mail.com',
      password: 'any-password',
    });

    expect(result.success).toBe(true);
    expect(result.data.token).toBeNull();
    expect(result.data.expiresAt).toBe('');
    expect(result.data.valid).toBe(false);
    expect(result.code).toBe(CREDENTIAL_ERROR_CODES.invalidCredentials);
    expect(result.message).toBe(CREDENTIAL_ERROR_MESSAGES.invalidCredentials);
  });

  it('should not generate token if password is invalid', async () => {
    hashComparerService.compare = jest.fn().mockResolvedValue(false);

    const result = await sut.execute({
      email: 'test@mail.com',
      password: 'invalid-password',
    });

    expect(result.success).toBe(true);
    expect(result.data.token).toBeNull();
    expect(result.data.expiresAt).toBe('');
    expect(result.data.valid).toBe(false);
    expect(result.code).toBe(CREDENTIAL_ERROR_CODES.invalidCredentials);
    expect(result.message).toBe(CREDENTIAL_ERROR_MESSAGES.invalidCredentials);
  });

  it('should return success as false if token was not generated successfully', async () => {
    tokenGeneratorService.generate = jest.fn().mockReturnValue(null);

    const result = await sut.execute({
      email: 'test@mail.com',
      password: 'any-password',
    });

    expect(result.success).toBe(false);
    expect(result.data).toBeNull();
    expect(result.code).toBe(ERROR_CODES.unexpectedError);
    expect(result.message).toBe(ERROR_MESSAGES.unexpectedError);
  });
});
