import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Entity } from './entity';

export enum UserType {
  storekeeper = 'storekeeper',
  common = 'common',
}

export class User extends Entity {
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

  @IsDate()
  @IsOptional()
  created_at: Date;
}
