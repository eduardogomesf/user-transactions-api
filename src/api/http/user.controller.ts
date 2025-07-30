import { Body, Controller, Post } from '@nestjs/common';
import { AddNewUserDto } from './dto';
import { AddNewUserUseCase } from '@/application/use-case';

@Controller('users')
export class UserController {
  constructor(private readonly addNewUserUseCase: AddNewUserUseCase) {}

  @Post()
  async create(@Body() body: AddNewUserDto) {
    return await this.addNewUserUseCase.execute(body);
  }
}
