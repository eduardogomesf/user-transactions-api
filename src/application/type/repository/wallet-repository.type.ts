import { Currency, Wallet } from '@/domain/entity';

export interface GetWalletByUserIdAndCurrencyRepository {
  getOneByUserIdAndCurrency(
    userId: string,
    currency: Currency,
  ): Promise<Wallet>;
}
