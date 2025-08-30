import * as jwt from 'jsonwebtoken';
import { TokenService } from '@/application/type/service';
import { JwtTokenService } from './token.service';

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn().mockReturnValue('token'),
}));

jest.useFakeTimers().setSystemTime(new Date(2020, 9, 1, 7));

describe('TokenService', () => {
  let sut: TokenService;

  beforeEach(() => {
    sut = new JwtTokenService();
  });

  describe('generate', () => {
    it('should generate a token successfully', () => {
      const signSpy = jest.spyOn(jwt, 'sign');

      const result = sut.generate('any-id', 900, 'any-secret', {
        foo: 'bar',
      });

      expect(result.token).toBe('token');
      expect(result.expiresAt).toBe('2020-10-01T10:15:00.000Z');
      expect(signSpy).toHaveBeenCalledWith(
        {
          foo: 'bar',
        },
        'any-secret',
        {
          subject: 'any-id',
          expiresIn: 1601547300,
        },
      );
    });
  });
});
