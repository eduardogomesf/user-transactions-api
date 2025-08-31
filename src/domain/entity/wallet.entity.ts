import { Entity } from './entity';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export enum Currency {
  USD = 'USD',
  EUR = 'EUR',
  BRL = 'BRL',
}

export class Wallet extends Entity {
  @IsNumber()
  @IsNotEmpty()
  balance: number;

  @IsEnum(Currency)
  @IsNotEmpty()
  currency: Currency;

  @IsString()
  @IsNotEmpty()
  userId: string;
}
