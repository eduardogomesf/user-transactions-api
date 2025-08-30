import { Inject, Injectable } from '@nestjs/common';
import { UseCase } from '@/shared/type';
import {
  AuthenticateUserUseCaseParams,
  AuthenticateUserUseCaseResponse,
  GetUserCredentialsByEmailRepository,
} from '../type';
import { FieldsValidator } from '@/shared/util';
import {
  CREDENTIAL_ERROR_CODES,
  CREDENTIAL_ERROR_MESSAGES,
  ERROR_CODES,
  ERROR_MESSAGES,
  HASHING_SERVICE,
  TOKEN_SERVICE,
  USER_REPOSITORY,
} from '@/shared/constant';
import { HashComparerService, TokenGeneratorService } from '../type/service';
import { Configuration } from '@/shared/configuration';

@Injectable()
export class AuthenticateUserUseCase
  implements UseCase<AuthenticateUserUseCaseParams>
{
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly getUserCredentialsByEmailRepository: GetUserCredentialsByEmailRepository,
    @Inject(HASHING_SERVICE)
    private readonly hashComparerService: HashComparerService,
    @Inject(TOKEN_SERVICE)
    private readonly tokenGeneratorService: TokenGeneratorService,
    private readonly configs: Configuration,
  ) {}

  async execute(
    params: AuthenticateUserUseCaseParams,
  ): Promise<AuthenticateUserUseCaseResponse> {
    const paramsValidation = await FieldsValidator.validate(params);

    if (!paramsValidation.valid) {
      return {
        success: false,
        data: null,
        code: ERROR_CODES.fieldValidationError,
        message: FieldsValidator.formatErrorMessage(paramsValidation.errors),
      };
    }

    const credentials =
      await this.getUserCredentialsByEmailRepository.getCredentials(
        params.email,
      );

    const invalidCredentialsResponse = {
      success: true,
      data: {
        valid: false,
        token: null,
        expiresAt: '',
      },
      code: CREDENTIAL_ERROR_CODES.invalidCredentials,
      message: CREDENTIAL_ERROR_MESSAGES.invalidCredentials,
    };

    if (!credentials) {
      return invalidCredentialsResponse;
    }

    const isPasswordValid = await this.hashComparerService.compare(
      params.password,
      credentials.password,
    );

    if (!isPasswordValid) {
      return invalidCredentialsResponse;
    }

    const generatedToken = this.tokenGeneratorService.generate(
      credentials.id,
      this.configs.token.accessToken.duration,
      this.configs.token.accessToken.secret,
    );

    if (!generatedToken || !generatedToken.token) {
      return {
        success: false,
        data: null,
        code: ERROR_CODES.unexpectedError,
        message: ERROR_MESSAGES.unexpectedError,
      };
    }

    return {
      success: true,
      data: {
        token: generatedToken.token,
        expiresAt: generatedToken.expiresAt,
        valid: true,
      },
    };
  }
}
