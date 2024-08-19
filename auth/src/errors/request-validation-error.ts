import { ValidationError } from "express-validator";
import { CustomError } from "./custom-error";

export class RequestValidationError extends CustomError {
  statusCode = 400;

  constructor(public errors: ValidationError[]) {
    super('Invalid request parameters');

    // Because we are extending a built in class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  };

  serializeErrors() {
    let errors = this.errors.map(err => {
      if (err.type === 'field') {
        return { message: err.msg, field: err.path };
      }

      return { message: err.msg };
    });

    return errors;
  };
};

