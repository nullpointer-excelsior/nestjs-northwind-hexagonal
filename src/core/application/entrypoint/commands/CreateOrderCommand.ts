import { CreateOrderDto } from '../../../shared/dto/CreateOrderDto'

export class CreateOrderCommand {
    
    constructor(public readonly order: CreateOrderDto) { }
    
}