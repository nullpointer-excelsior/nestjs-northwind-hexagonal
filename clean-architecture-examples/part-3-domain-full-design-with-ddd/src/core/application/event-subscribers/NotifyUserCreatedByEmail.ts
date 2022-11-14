import { UserCreated } from "../../domain/events/UserCreated";
import { User } from "../../domain/model/entities/User";
import { EmailService } from "../../shared/application/ports/outbound/email-service/EmailService";
import { DomainEvent } from "../../shared/domain/DomainEvent";
import { DomainEventSubscriber } from "../../shared/domain/DomainEventSubscriber";

export class NotifyUserCreatedByEmail implements DomainEventSubscriber<User> {

    constructor(private readonly service: EmailService) { }

    async onEvent(event: DomainEvent<User>) {
        
        const user = event.getData()

        await this.service.send({
            to: user.email,
            message: `Congratulations your username is ${user.username}. you must to complete the register on ....`,
            sent: new Date()
        })

    }

    suscribeTo(): string {
        return UserCreated.EVENT_NAME
    }

}