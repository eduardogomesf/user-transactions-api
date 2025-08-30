export type GeneratedToken = {
  token: string;
  expiresAt: string;
};

export interface TokenService {
  generate: (
    id: string,
    duration: '1d' | '1h' | '30m' | '15m',
    secret: string,
    payload?: Record<string, any>,
  ) => GeneratedToken;
}
