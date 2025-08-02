import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail, IsEnum } from 'class-validator';
import { UserType } from '@/domain/entity';

export class AddNewUserDto {
  @ApiProperty({
    description: 'Full name of the user',
  })
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @ApiProperty({
    description: `National document (aka Identity Card) of the user`,
  })
  @IsString()
  @IsNotEmpty()
  document: string;

  @ApiProperty({
    description: `Email of the user to be used for contact`,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Password for accessing the account',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    enumName: 'UserType',
    enum: UserType,
  })
  @IsEnum(UserType)
  @IsNotEmpty()
  type: UserType;
}
