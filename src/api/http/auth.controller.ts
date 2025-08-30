import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticateUserUseCase } from '@/application/use-case';
import { LoginDto } from './dto';
import { convertUseCaseResponseToHttp } from './util';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authenticateUserUseCase: AuthenticateUserUseCase,
  ) {}

  @Post('login')
  async login(@Body() body: LoginDto) {
    const useCaseResponse = await this.authenticateUserUseCase.execute(body);
    return convertUseCaseResponseToHttp(useCaseResponse);
  }
}
