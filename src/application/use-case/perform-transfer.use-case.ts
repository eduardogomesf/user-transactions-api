import { UseCase } from '@/shared/type';
import {
  PerformTransferUseCaseParams,
  PerformTransferUseCaseResponse,
} from '../type';
import { GetWalletByUserIdAndCurrencyRepository } from '../type/repository';
import { FieldsValidator } from '@/shared/util';
import {
  ERROR_CODES,
  TRANSFER_ERROR_CODES,
  TRANSFER_ERROR_MESSAGES,
} from '@/shared/constant';

export class PerformTransferUseCase
  implements UseCase<PerformTransferUseCaseParams>
{
  constructor(
    private readonly getWalletByUserIdAndCurrencyRepository: GetWalletByUserIdAndCurrencyRepository,
  ) {}

  async execute(
    params: PerformTransferUseCaseParams,
  ): Promise<PerformTransferUseCaseResponse> {
    const paramsValidation = await FieldsValidator.validate(params);

    if (!paramsValidation.valid) {
      return {
        success: false,
        data: null,
        code: ERROR_CODES.fieldValidationError,
        message: FieldsValidator.formatErrorMessage(paramsValidation.errors),
      };
    }

    const [payerWallet, payeeWallet] = await Promise.all([
      this.getWalletByUserIdAndCurrencyRepository.getOneByUserIdAndCurrency(
        params.payerId,
        params.currency,
      ),
      this.getWalletByUserIdAndCurrencyRepository.getOneByUserIdAndCurrency(
        params.payeeId,
        params.currency,
      ),
    ]);

    if (!payerWallet) {
      return {
        success: false,
        data: null,
        code: TRANSFER_ERROR_CODES.payer.walletNotFound,
        message: TRANSFER_ERROR_MESSAGES.payer.walletNotFound,
      };
    }

    if (!payeeWallet) {
      return {
        success: false,
        data: null,
        code: TRANSFER_ERROR_CODES.payee.walletNotFound,
        message: TRANSFER_ERROR_MESSAGES.payee.walletNotFound,
      };
    }

    if (payerWallet.balanceInCents < params.valueInCents) {
      return {
        success: false,
        data: null,
        code: TRANSFER_ERROR_CODES.balance.notEnoughBalance,
        message: TRANSFER_ERROR_MESSAGES.balance.notEnoughBalance,
      };
    }

    // Perform transfer

    return {
      success: true,
      data: {
        transferId: '',
      },
    };
  }
}
