import { Category } from '../../domain/entities/Category';
import { ProductApplication } from "../ProductApplication";
import { Supplier } from "../../domain/entities/Supplier";
import { ProductApplicationService } from "./ProductApplicationService";
import { Product } from "../../domain/entities/Product";
import { ProductApplicationError } from "../../shared/error/ProductApplicationError";
import { ProductService } from '../../domain/ports/inbound/ProductService';
import { CategoryService } from '../../domain/ports/inbound/CategoryService';
import { SupplierService } from '../../domain/ports/inbound/SupplierService';

function ProductServiceMock(productId: any): ProductService {
  const product = { 
    productId, 
    productName: 'Pasta italiana'
  } as Product
  return { 
    save: jest.fn().mockReturnValue(Promise.resolve(product)),
    validateProductPrice: jest.fn().mockReturnValue(true)
  }
}

function CategoryServiceMock(returnValue: any): CategoryService {
  return { 
    findById: jest.fn().mockReturnValue(Promise.resolve(returnValue)),
    findAll: jest.fn().mockReturnValue([])
  }
}

function SupplierServiceMock(returnValue: any): SupplierService {
  return { 
    findById: jest.fn().mockReturnValue(Promise.resolve(returnValue))  
  }
}

describe('ProductApplicationService', () => {

  let service: ProductApplication = null

  it('should call ProductService.save()"', async () => {
    
    const categoryMock = CategoryServiceMock(new Category())
    const productMock = ProductServiceMock(1)
    const supplierMock = SupplierServiceMock(new Supplier())

    service = new ProductApplicationService(productMock, categoryMock, supplierMock)

    const result = await service.createProduct({ name: 'product1', categoryId: 1, supplierId: 1})

    expect(productMock.save).toBeCalled()
    expect(result).toBe(1)

  });

  it('should throw ProductApplicationError with a invalid category', async () => {
  
    const categoryMock = CategoryServiceMock(null)
    const productMock = ProductServiceMock (1)
    const supplierMock = SupplierServiceMock(new Supplier())

    service = new ProductApplicationService(productMock, categoryMock, supplierMock)

    await expect(service.createProduct({ name: 'quesito', categoryId: 1, supplierId: 1})).rejects.toThrow(ProductApplicationError);
    expect(productMock.save).not.toBeCalled()

  });

  it('should throw ProductApplicationError with a invalid supplier', async () => {
    
    const categoryMock = CategoryServiceMock(new Category())
    const productMock = ProductServiceMock (1)
    const supplierMock = SupplierServiceMock(null)

    service = new ProductApplicationService(productMock, categoryMock, supplierMock)

    await expect(service.createProduct({ name: 'paltita', categoryId: 1, supplierId: 1})).rejects.toThrow(ProductApplicationError);
    expect(productMock.save).not.toBeCalled()

  });
});
