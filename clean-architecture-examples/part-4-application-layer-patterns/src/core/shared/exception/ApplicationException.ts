
export class ApplicationException extends Error {
    __proto__ = Error
  
    constructor(message: string) {
      super(message);
      Object.setPrototypeOf(this, ApplicationException.prototype);
    }
  
  }