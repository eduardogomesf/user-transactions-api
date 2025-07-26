import { validate } from 'class-validator';
import { ValidationError } from '../type';

export class FieldsValidator {
  static async validate(
    obj: Record<string, unknown>,
    hideValuesInErrors = false,
  ): Promise<{
    valid: boolean;
    errors: ValidationError[];
  }> {
    const validationResult = await validate(obj);

    if (!validationResult?.length) {
      return {
        valid: true,
        errors: [],
      };
    }

    const errors = validationResult.map((vr) => ({
      field: vr.property,
      value: hideValuesInErrors ? '[redacted]' : vr.value,
      errors: vr.constraints,
    }));

    return {
      valid: false,
      errors,
    };
  }
}
