import { CategoryService } from "../../domain/ports/services/CategoryService";
import { Category } from '../../domain/entities/Category';
import { ProductService } from "../../domain/ports/services/ProductService";
import { ProductCreator } from "./ProductCreator";
import { InvalidCategoryError } from "../error/InvalidCategoryError";

describe('ProductCreator', () => {

  let service: ProductCreator = null


  it('should call productService.create()"', async () => {
    
    const categoryMock: CategoryService = {
      findById: jest.fn().mockReturnValue(Promise.resolve(new Category()))
    }
  
    const productMock: ProductService = {
      create: jest.fn().mockImplementationOnce(() => Promise.resolve())
    }

    service = new ProductCreator(productMock, categoryMock)

    await service.create({ name: 'product1', categoryId: 1})

    expect(productMock.create).toBeCalled()

  });

  it('should throw InvalidCategoryError"', async () => {
    
    const categoryMock: CategoryService = {
      findById: jest.fn().mockReturnValue(Promise.resolve(null))
    }
  
    const productMock: ProductService = {
      create: jest.fn().mockImplementationOnce(() => Promise.resolve())
    }

    service = new ProductCreator(productMock, categoryMock)

    expect(async () => service.create({ name: 'product1', categoryId: 1})).rejects.toThrow(InvalidCategoryError);
    expect(productMock.create).not.toBeCalled()

  });
});
