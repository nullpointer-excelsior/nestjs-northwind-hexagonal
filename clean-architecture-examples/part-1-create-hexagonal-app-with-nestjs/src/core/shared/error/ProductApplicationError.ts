
export class ProductApplicationError extends Error {
    __proto__ = Error
  
    constructor(message: string) {
      super(message);
      Object.setPrototypeOf(this, ProductApplicationError.prototype);
    }
  
  }