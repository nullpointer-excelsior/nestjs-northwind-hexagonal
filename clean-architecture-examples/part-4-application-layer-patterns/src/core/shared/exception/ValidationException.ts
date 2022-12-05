
export class ValidationException extends Error {
    __proto__ = Error
  
    constructor(message: string) {
      super(message);
      Object.setPrototypeOf(this, ValidationException.prototype);
    }
  
  }