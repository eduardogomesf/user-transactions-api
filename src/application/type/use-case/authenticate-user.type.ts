import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { UseCaseResponse } from '@/shared/type';

export class AuthenticateUserUseCaseParams {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

type Response = {
  token: string;
  expiresAt: string;
  valid: boolean;
};

export type AuthenticateUserUseCaseResponse = UseCaseResponse<Response>;
