import { UUID_EXAMPLE } from "../../../../test/utils/uuid.examples"
import { Email } from "../model/valueobjects/email"
import { Username } from "../model/valueobjects/username"
import { Id } from "../../shared/domain/valueobjects/Id"
import { UserBuilder } from "./UserBuilder"
import { User } from "../model/entities/User"

describe('UserBuilder', () => {

    it('shoud create a valid id', () => {
        const builder = User.builder()

        const resultIdValue = builder
            .id(UUID_EXAMPLE)
            .build()
        expect(resultIdValue.id.getValue()).toBe(UUID_EXAMPLE)

        const resultId = builder
            .id(new Id(UUID_EXAMPLE))
            .build()
        expect(resultId.id.getValue()).toBe(UUID_EXAMPLE)


    })

    it('shoud create a valid email', () => {
        const builder = User.builder()

        const resultEmailValue = builder
            .email('john@gmail.com')
            .build()
        expect(resultEmailValue.email.getValue()).toBe('john@gmail.com')

        const resultEmail = builder
            .email(new Email('wick@gmail.com'))
            .build()
        expect(resultEmail.email.getValue()).toBe('wick@gmail.com')

    })

    it('shoud create a valid username', () => {
        const builder = User.builder()

        const resultUsernameValue = builder
            .username('j.wick07')
            .build()
        expect(resultUsernameValue.username.getValue()).toBe('j.wick07')

        const resultEmail = builder
            .username(new Username('j.wick00'))
            .build()
        expect(resultEmail.username.getValue()).toBe('j.wick00')

        
    })
})