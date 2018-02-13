// @flow

export class FormHelper {
  context: any;
  validator: Function;
  constructor(context: any, validator: Function) {
    this.context = context;
    this.validator = validator;
  }

  validate = (callback: Function): any =>
    this.context.setState(
      ({ values }: any): any => ({
        validations: this.validator(values)
      }),
      callback
    );

  hasValidationErrors = (): boolean => {
    const { validations } = this.context.state;
    const keys = Object.keys(validations);
    let hasError = false;
    keys.forEach((key: string) => {
      // hasError should be true if at least one field is invalid
      const isError = validations[key].length > 0;
      hasError = hasError || isError;
    });
    return hasError;
  };
}
