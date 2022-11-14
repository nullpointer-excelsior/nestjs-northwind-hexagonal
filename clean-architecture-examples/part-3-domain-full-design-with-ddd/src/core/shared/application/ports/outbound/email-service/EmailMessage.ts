import { Email } from "../../../../../domain/model/valueobjects/email";

export interface EmailMessage {
    to: Email;
    message: string;
    sent: Date;
}