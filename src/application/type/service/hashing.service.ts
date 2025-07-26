export interface HashingService {
  hash: (value: string) => Promise<string>;
}
