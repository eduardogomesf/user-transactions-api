export interface HashGeneratorService {
  hash: (value: string) => Promise<string>;
}

export interface HashComparerService {
  compare: (value: string, hashedValue: string) => Promise<boolean>;
}

export type HashingService = HashGeneratorService & HashComparerService;
