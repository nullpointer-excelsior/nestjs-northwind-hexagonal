
export class ProductCreatorError extends Error {
    __proto__ = Error
  
    constructor(message: string) {
      super(message);
      Object.setPrototypeOf(this, ProductCreatorError.prototype);
    }
  
  }