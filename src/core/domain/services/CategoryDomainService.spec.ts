import { Category } from "../entities/Category";
import { CategoryService } from "../ports/inbound/CategoryService";
import { CategoryRepository } from "../ports/outbound/CategoryRepository";
import { CategoryDomainService } from "./CategoryDomainService";


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