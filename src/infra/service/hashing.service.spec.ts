import * as bcrypt from 'bcrypt';
import { HashingService } from '@/application/type/service';
import { BcryptHashingService } from './hashing.service';
import { Configuration } from '@/shared/configuration';

jest.mock('bcrypt', () => {
  return {
    hash: jest.fn().mockResolvedValue('hashed-value'),
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

  it('should generate a hashed value', async () => {
    const result = await hashingService.hash('any-value');

    expect(bcrypt.hash).toHaveBeenCalledWith('any-value', 10);
    expect(result).toBe('hashed-value');
  });
});
