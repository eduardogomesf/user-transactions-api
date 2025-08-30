import * as bcrypt from 'bcrypt';
import { HashingService } from '@/application/type/service';
import { BcryptHashingService } from './hashing.service';
import { Configuration } from '@/shared/configuration';

jest.mock('bcrypt', () => {
  return {
    hash: jest.fn().mockResolvedValue('hashed-value'),
    compare: jest.fn().mockResolvedValue(true),
  };
});

describe('HashingService', () => {
  let hashingService: HashingService;

  beforeEach(() => {
    hashingService = new BcryptHashingService({
      hashing: {
        rounds: 10,
      },
    } as Configuration);
  });

  describe('hash', () => {
    it('should generate a hashed value', async () => {
      const result = await hashingService.hash('any-value');

      expect(bcrypt.hash).toHaveBeenCalledWith('any-value', 10);
      expect(result).toBe('hashed-value');
    });
  });

  describe('compare', () => {
    it('should return true if values are valid', async () => {
      const result = await hashingService.compare('value', 'hashed-value');

      expect(result).toBe(true);
    });

    it('should return false if values are invalid', async () => {
      jest.spyOn(bcrypt, 'compare').mockImplementation(() => false);

      const result = await hashingService.compare(
        'wrong-value',
        'hashed-value',
      );

      expect(result).toBe(false);
    });
  });
});
