import { CategoryService } from "../domain/ports/services/CategoryService";
import { Category } from '../domain/entities/Category';
import { ProductService } from "../domain/ports/services/ProductService";
import { ProductCreator } from "./ProductCreator";
import { SupplierService } from "../domain/ports/services/SupplierService";
import { Supplier } from "../domain/entities/Supplier";
import { ProductCreatorApplication } from "./ProductCreatorApplication";
import { Product } from "../domain/entities/Product";
import { ProductCreatorError } from "../shared/error/ProductCreatorError";

function ProductServiceMock(fn: any): ProductService{
  return { create: fn }
}

function CategoryServiceMock(fn: any): CategoryService {
  return { findById: fn }
}

function SupplierServiceMock(fn: any): SupplierService {
  return { findById: fn }
}

describe('ProductCreator', () => {

  let service: ProductCreator = null

  it('should call productService.create()"', async () => {
    
    const categoryMock = CategoryServiceMock(jest.fn().mockReturnValue(Promise.resolve(new Category())))
    const productMock = ProductServiceMock (jest.fn().mockImplementationOnce(() => Promise.resolve({ productId: 1} as Product)))
    const supplierMock = SupplierServiceMock(jest.fn().mockReturnValue(Promise.resolve(new Supplier())))

    service = new ProductCreatorApplication(productMock, categoryMock, supplierMock)

    const result = await service.create({ name: 'product1', categoryId: 1, supplierId: 1})

    expect(productMock.create).toBeCalled()
    expect(result).toBe(1)

  });

  it('should throw ProductCreatorError with a invalid category', async () => {
  
    const categoryMock = CategoryServiceMock(jest.fn().mockReturnValue(Promise.resolve(null)))
    const productMock = ProductServiceMock (jest.fn().mockImplementationOnce(() => Promise.resolve({ productId: 1} as Product)))
    const supplierMock = SupplierServiceMock(jest.fn().mockReturnValue(Promise.resolve(new Supplier())))

    service = new ProductCreatorApplication(productMock, categoryMock, supplierMock)

    await expect(service.create({ name: 'quesito', categoryId: 1, supplierId: 1})).rejects.toThrow(ProductCreatorError);
    expect(productMock.create).not.toBeCalled()

  });

  it('should throw ProductCreatorError with a invalid supplier', async () => {
    
    const categoryMock = CategoryServiceMock(jest.fn().mockReturnValue(Promise.resolve(new Category())))
    const productMock = ProductServiceMock (jest.fn().mockImplementationOnce(() => Promise.resolve({ productId: 1} as Product)))
    const supplierMock = SupplierServiceMock(jest.fn().mockReturnValue(Promise.resolve(null)))

    service = new ProductCreatorApplication(productMock, categoryMock, supplierMock)

    await expect(service.create({ name: 'paltita', categoryId: 1, supplierId: 1})).rejects.toThrow(ProductCreatorError);
    expect(productMock.create).not.toBeCalled()

  });
});
