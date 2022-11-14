import { DomainException } from "../../../shared/error/DomainException"
import { Username } from "./username"

describe('UsernameValueObject', () => {
    
    it('Must create a Username() object with a valid Northwind securty policy username ', () => {
        const userValue = 'j.wick'
        const email = new Username(userValue)
        expect(email.getValue()).toBeDefined()
        expect(email.getValue()).toBe(userValue)
        
    })

    it('Must throw a DomainException with an invalid username', () => {
        
        expect(() =>new Username('john.wick')).toThrow(DomainException)
        expect(() =>new Username('jhonwick')).toThrow(DomainException)
        expect(() =>new Username('j,wick')).toThrow(DomainException)
        
    })
})