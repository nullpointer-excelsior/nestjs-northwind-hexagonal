
export class InvalidCategoryError extends Error {
    __proto__ = Error
  
    constructor(id: number) {
      super(`Category(id=${id}) Invalid`);
      Object.setPrototypeOf(this, InvalidCategoryError.prototype);
    }
  
  }