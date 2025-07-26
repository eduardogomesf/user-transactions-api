export type ValidationError = {
  field: string;
  value: unknown;
  errors: {
    [type: string]: string;
  };
};
