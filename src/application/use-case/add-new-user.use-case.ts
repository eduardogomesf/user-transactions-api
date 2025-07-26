import { Injectable } from '@nestjs/common';
import { UseCase } from '@/shared/type';
import {
  AddNewUserUseCaseParams,
  AddNewUserUseCaseResponse,
  GetUserByEmailRepository,
  GetUserByDocumentRepository,
  SaveUserRepository,
} from '../type';
import { ERROR_CODES, USER_ERROR_MESSAGES } from '@/shared/constant';
import { plainToInstance } from 'class-transformer';
import { User } from '@/domain/entity';
import { FieldsValidator } from '@/shared/util';

@Injectable()
export class AddNewUserUseCase implements UseCase<AddNewUserUseCaseParams> {
  constructor(
    private readonly getUserByDocumentRepository: GetUserByDocumentRepository,
    private readonly getUserByEmailRepository: GetUserByEmailRepository,
    private readonly saveUserRepository: SaveUserRepository,
  ) {}

  async execute(
    params: AddNewUserUseCaseParams,
  ): Promise<AddNewUserUseCaseResponse> {
    const paramsValidation = await FieldsValidator.validate(params);

    if (!paramsValidation.valid) {
      return {
        success: false,
        data: null,
        code: ERROR_CODES.fieldValidationError,
        message: FieldsValidator.formatErrorMessage(paramsValidation.errors),
      };
    }

    const userByDocument = await this.getUserByDocumentRepository.getByDocument(
      params.document,
    );

    if (userByDocument) {
      return {
        data: null,
        success: false,
        code: ERROR_CODES.alreadyExists,
        message: USER_ERROR_MESSAGES.documentInUse,
      };
    }

    const userByEmail = await this.getUserByEmailRepository.getByEmail(
      params.email,
    );

    if (userByEmail) {
      return {
        data: null,
        success: false,
        code: ERROR_CODES.alreadyExists,
        message: USER_ERROR_MESSAGES.emailInUse,
      };
    }

    const user = plainToInstance(User, params);

    await this.saveUserRepository.save(user);

    return {
      data: user.id,
      success: true,
    };
  }
}
