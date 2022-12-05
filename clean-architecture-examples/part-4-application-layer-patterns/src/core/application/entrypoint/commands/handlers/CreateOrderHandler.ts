import { Logger } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { PurchaseUseCases } from "../../../services/PurchaseUseCases";
import { CreateOrderCommand } from "../CreateOrderCommand";

@CommandHandler(CreateOrderCommand)
export class CreateOrderHandler implements ICommandHandler<CreateOrderCommand> {

    constructor(private purchase: PurchaseUseCases) { }

    async execute(command: CreateOrderCommand) {
        this.purchase.createOrder(command.order)
    }

}