import { TOKEN_SERVICE } from '@/shared/constant';
import { JwtTokenService } from '@/infra/service/token.service';

export const TokenServiceProvider = {
  provide: TOKEN_SERVICE,
  useClass: JwtTokenService,
};
