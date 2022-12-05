
export class EntityNotFoundException extends Error {
    __proto__ = Error
  
    constructor(message: string) {
      super(message);
      Object.setPrototypeOf(this, EntityNotFoundException.prototype);
    }
  
  }