import { UseCaseResponse } from '@/shared/type';
import { IsString, IsNotEmpty, IsEmail, IsEnum } from 'class-validator';
import { UserType } from '@/domain/entity';

export class AddNewUserUseCaseParams {
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @IsString()
  @IsNotEmpty()
  document: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEnum(UserType)
  @IsNotEmpty()
  type: UserType;
}

export type AddNewUserUseCaseResponse = UseCaseResponse<string>;
