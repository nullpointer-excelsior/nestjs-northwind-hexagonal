import { ProductServiceError } from "../../shared/error/ProductServiceError";
import { Product } from "../entities/Product";
import { ProductService } from "../ports/inbound/ProductService";
import { ProductRepository } from "../ports/outbound/ProductRepository";
import { ProductDomainService } from "./ProductDomainService";


function ProductrepositoryMock(product: Product): ProductRepository {
    return {
        save: jest.fn().mockReturnValue(Promise.resolve(product))
    }
}

describe('ProductDomainService', () => {

    let service: ProductService = null

    it('should call ProductRepository.save()"', async () => {
        const repositoryMock =  ProductrepositoryMock(({ productId: 1} as Product))
        service = new ProductDomainService(repositoryMock)
        await service.save({ productId: 1, unitPrice: 100} as Product)
        expect(repositoryMock.save).toBeCalled()
    });

    it('should return true productService.validateProductPrice() when unitPrice is greater than 0 "', async () => {
        const repositoryMock =  ProductrepositoryMock(({ productId: 1} as Product))
        service = new ProductDomainService(repositoryMock)
        const result = service.validateProductPrice({ productId: 1, unitPrice: 100} as Product)
        expect(result).toBe(true)
    });

    it('should throw ProductServiceError when unitPrice is negative or zero"', async () => {
        const repositoryMock =  ProductrepositoryMock(({ productId: 1} as Product))
        service = new ProductDomainService(repositoryMock)
        await expect(service.save({ productId: 1, unitPrice: 0 } as Product)).rejects.toThrow(ProductServiceError)
        await expect(service.save({ productId: 1, unitPrice: -10 } as Product)).rejects.toThrow(ProductServiceError)
    });

})