import { IsNumber, IsNotEmpty, IsString, IsDate } from 'class-validator';
import { Entity } from './entity';

export class Transaction extends Entity {
  @IsNumber()
  @IsNotEmpty()
  valueInCents: number;

  @IsString()
  @IsNotEmpty()
  payeeId: string;

  @IsString()
  @IsNotEmpty()
  payerId: string;

  @IsDate()
  @IsNotEmpty()
  transferDate: Date;
}
