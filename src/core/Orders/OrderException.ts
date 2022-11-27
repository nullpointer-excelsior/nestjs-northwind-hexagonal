export class OrderException extends Error {
    __proto__ = Error
  
    constructor(message: string) {
      super(message);
      Object.setPrototypeOf(this, OrderException.prototype);
    }
  
  }