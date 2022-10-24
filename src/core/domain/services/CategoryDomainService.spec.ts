import { ProductServiceError } from "../../shared/error/ProductServiceError";
import { Category } from "../entities/Category";
import { Product } from "../entities/Product";
import { CategoryService } from "../ports/inbound/CategoryService";
import { ProductService } from "../ports/inbound/ProductService";
import { CategoryRepository } from "../ports/outbound/CategoryRepository";
import { ProductRepository } from "../ports/outbound/ProductRepository";
import { CategoryDomainService } from "./CategoryDomainService";
import { ProductDomainService } from "./ProductDomainService";


function CategoryRepositoryMock(): CategoryRepository {
    return {
        findById: jest.fn().mockReturnValue(Promise.resolve(new Category())),
        findAll: jest.fn().mockReturnValue(Promise.resolve([]))
    }
}

describe('CategoryDomainService', () => {

    let service: CategoryService = null

    it('should call CategoryRepository.findById()"', async () => {
        const repositoryMock =  CategoryRepositoryMock()
        service = new CategoryDomainService(repositoryMock)
        await service.findById(1)
        expect(repositoryMock.findById).toBeCalled()
    });

    it('should call CategoryRepository.findAll()"', async () => {
        const repositoryMock =  CategoryRepositoryMock()
        service = new CategoryDomainService(repositoryMock)
        await service.findAll()
        expect(repositoryMock.findAll).toBeCalled()
    });


})