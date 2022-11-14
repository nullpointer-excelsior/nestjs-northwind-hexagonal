import { DomainException } from "../../../shared/error/DomainException"
import { Email } from "./email"

describe('EmailValueObject', () => {

    it('Must create a Email() object with a valid email', () => {
        const emailValue = 'user@gmail.com'
        const email = new Email(emailValue)
        expect(email.getValue()).toBeDefined()
        expect(email.getValue()).toBe(emailValue)

    })

    it('Must throw a DomainException with an invalid email', () => {

        expect(() => new Email('user@gmail')).toThrow(DomainException)
        expect(() => new Email('user.com')).toThrow(DomainException)
        expect(() => new Email('username')).toThrow(DomainException)

    })
})