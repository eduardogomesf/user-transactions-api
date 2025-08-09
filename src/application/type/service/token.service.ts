export interface TokenService {
  generate: (
    id: string,
    durationInSeconds: number,
    secret: string,
    payload?: Record<string, any>,
  ) => string;
}
