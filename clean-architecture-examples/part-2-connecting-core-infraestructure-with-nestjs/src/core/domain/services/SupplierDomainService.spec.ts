import { Supplier } from "../entities/Supplier";
import { SupplierService } from "../ports/inbound/SupplierService";
import { SupplierRepository } from "../ports/outbound/SupplierRepository";
import { SupplierDomainService } from "./SupplierDomainService";


function SupplierRepositoryMock(): SupplierRepository {
    return {
        findById: jest.fn().mockReturnValue(Promise.resolve(new Supplier())),
    }
}

describe('SupplierDomainService', () => {

    let service: SupplierService = null

    it('should call SupplierRepository.findById()"', async () => {
        const repositoryMock =  SupplierRepositoryMock()
        service = new SupplierDomainService(repositoryMock)
        await service.findById(1)
        expect(repositoryMock.findById).toBeCalled()
    });

})