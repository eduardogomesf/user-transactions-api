import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AddNewUserDto } from './dto';
import { AddNewUserUseCase } from '@/application/use-case';
import { convertUseCaseResponseToHttp } from './util';

@Controller('users')
export class UserController {
  constructor(private readonly addNewUserUseCase: AddNewUserUseCase) {}

  @Post()
  @HttpCode(201)
  async create(@Body() body: AddNewUserDto) {
    const useCaseResponse = await this.addNewUserUseCase.execute(body);
    return convertUseCaseResponseToHttp(useCaseResponse);
  }
}
