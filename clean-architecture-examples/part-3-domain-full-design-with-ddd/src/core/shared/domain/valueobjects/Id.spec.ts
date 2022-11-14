import { DomainException } from "../../error/DomainException"
import { Id } from "./Id"

describe('IdValueObject', () => {
    
    it('Must create a Id() object with UUID/GUID value', () => {
        const uuid = "d3aa88e2-c754-41e0-8ba6-4198a34aa0a2"
        const id = new Id(uuid)
        expect(id.getValue()).toBe(uuid)
        
    })

    it('Must throw a Error with an invalid UUID value', () => {
        
        expect(() =>new Id('abbc')).toThrow(DomainException)
        expect(() =>new Id('1')).toThrow(DomainException)
        expect(() =>new Id('adjqewjqwi')).toThrow(DomainException)
        
    })
})