import { EmailMessage } from "./EmailMessage"

export interface EmailService {

    send(notification: EmailMessage): Promise<void>

}