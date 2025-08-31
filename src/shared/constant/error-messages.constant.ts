export const ERROR_MESSAGES = {
  unexpectedError: 'Unexpected error',
};

export const USER_ERROR_MESSAGES = {
  documentInUse: 'The provided document belongs to an existing user',
  emailInUse: 'The provided email belongs to an existing user',
};

export const CREDENTIAL_ERROR_MESSAGES = {
  invalidCredentials: 'The provided credentials are invalid',
};

export const TRANSFER_ERROR_MESSAGES = {
  payer: {
    walletNotFound: 'No wallet found for given payerId and currency',
  },
  payee: {
    walletNotFound: 'No wallet found for given payeeId and currency',
  },
  balance: {
    notEnoughBalance: 'You do NOT have enough balance to perform this transfer',
  },
};
