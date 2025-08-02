import * as uuid from 'uuid';
import { GlobalIdGenerator } from './id-generator.service';
import { IdGeneratorService } from '@/application/type/service';

jest.mock('uuid', () => {
  return {
    v7: jest.fn().mockReturnValue('any-id'),
  };
});

describe('IdGeneratorService', () => {
  let sut: IdGeneratorService;

  beforeEach(() => {
    sut = new GlobalIdGenerator();
  });

  it('should generate a new unique id', () => {
    const id = sut.generate();

    expect(uuid.v7).toHaveBeenCalledTimes(1);
    expect(id).toBe('any-id');
  });
});
