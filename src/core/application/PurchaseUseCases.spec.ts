import { Order } from "../domain/Order"
import { OrderService } from "../domain/ports/inbound/OrderService"
import { CreateOrderDto } from "./dto/CreateOrderDto"
import { PurchaseUseCases } from "./PurchaseUseCases"


describe('PurchaseUseCases tests', () =>{
    
    it('createOrder use case', async () => {

        const ordermock = {
            create: jest.fn().mockResolvedValue({} as CreateOrderDto),
            save: jest.fn().mockResolvedValue(100),
            findById: jest.fn().mockResolvedValue({orderId: 100} as Order)
        } as unknown as OrderService 

        const purchase = new PurchaseUseCases(ordermock, null)
        const result = await purchase.createOrder({
            customerId: '1',
            employeeId: 1
        } as CreateOrderDto)
        
        expect(result.orderId).toBe(100)

    })

})