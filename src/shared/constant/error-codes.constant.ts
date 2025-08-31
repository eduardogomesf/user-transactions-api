export const ERROR_CODES = {
  alreadyExists: 'ALREADY_EXISTS',
  fieldValidationError: 'FIELD_VALIDATION_ERROR',
  unexpectedError: 'UNEXPECTED_ERROR',
} as const;

export const CREDENTIAL_ERROR_CODES = {
  invalidCredentials: 'INVALID_CREDENTIALS',
};

export const TRANSFER_ERROR_CODES = {
  payer: {
    walletNotFound: 'PAYER_WALLET_NOT_FOUND',
  },
  payee: {
    walletNotFound: 'PAYEE_WALLET_NOT_FOUND',
  },
  balance: {
    notEnoughBalance: 'NOT_ENOUGH_BALANCE',
  },
};
