import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { UseCaseResponse } from '@/shared/type';
import { Currency } from '@/domain/entity';

export class PerformTransferUseCaseParams {
  @IsNumber()
  @IsNotEmpty()
  valueInCents: number;

  @IsString()
  @IsNotEmpty()
  payerId: string;

  @IsString()
  @IsNotEmpty()
  payeeId: string;

  @IsEnum(Currency)
  @IsNotEmpty()
  currency: Currency;
}

type Response = {
  transferId: string;
};

export type PerformTransferUseCaseResponse = UseCaseResponse<Response>;
