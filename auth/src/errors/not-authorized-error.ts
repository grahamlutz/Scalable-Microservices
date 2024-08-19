import { CustomError } from "./custom-error";

export class NotAuthorizedError extends CustomError {
  statusCode = 401;
  reason = 'Not Authorized';

  constructor() {
    super('Not Authorized');

    // Because we are extending a built in class
    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  } 

  serializeErrors() {
    return [
      { message: this.reason }
    ]
  }
}
