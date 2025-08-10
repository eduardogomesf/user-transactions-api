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
  USER_REPOSITORY,
} from '@/shared/constant';
import { HashingService, TokenService } from '../type/service';
import { Configuration } from '@/shared/configuration';

@Injectable()
export class AuthenticateUserUseCase
  implements UseCase<AuthenticateUserUseCaseParams>
{
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly getUserCredentialsByEmailRepository: GetUserCredentialsByEmailRepository,
    @Inject(HASHING_SERVICE)
    private readonly hashingService: HashingService,
    private readonly tokenService: TokenService,
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
      success: false,
      data: null,
      code: CREDENTIAL_ERROR_CODES.invalidCredentials,
      message: CREDENTIAL_ERROR_MESSAGES.invalidCredentials,
    };

    if (!credentials) {
      return invalidCredentialsResponse;
    }

    const isPasswordValid = await this.hashingService.compare(
      params.password,
      credentials.password,
    );

    if (!isPasswordValid) {
      return invalidCredentialsResponse;
    }

    const accessTokenDurationInMs =
      this.configs.token.accessToken.durationInSeconds * 1000;

    const token = this.tokenService.generate(
      credentials.id,
      this.configs.token.accessToken.durationInSeconds,
      this.configs.token.accessToken.secret,
    );

    if (!token) {
      return {
        success: false,
        data: null,
        code: ERROR_CODES.unexpectedError,
        message: ERROR_MESSAGES.unexpectedError,
      };
    }

    const expirationDate = new Date(
      new Date().getTime() + accessTokenDurationInMs,
    );

    return {
      success: true,
      data: {
        token: token,
        expiresAt: expirationDate.toISOString(),
      },
    };
  }
}
