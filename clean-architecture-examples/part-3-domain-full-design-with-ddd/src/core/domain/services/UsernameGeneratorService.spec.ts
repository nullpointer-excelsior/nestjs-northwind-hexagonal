import { User } from "../model/entities/User";
import { Username } from "../model/valueobjects/username"
import { UserRepository } from "../ports/outbound/UserRepository"
import { UniqueUsernameGeneratorService } from "./UniqueUsernameGeneratorService";

function UserRepositoryMock(value: any) {
    const repository: UserRepository = {
        save: jest.fn(),
        findByUsernameStartWith: jest.fn().mockReturnValue(Promise.resolve(value))
    }
    return repository
}

describe('UsernameGeneratorService', () => {

    let usernameGenerator;

    it('should return a username j.wick00', async () => {
        const mock = UserRepositoryMock([])
        usernameGenerator = new UniqueUsernameGeneratorService(mock)
        const result: Username = await usernameGenerator.generate('john', 'wick')
        expect(result.getValue()).toBe('j.wick00')
    })

    it('should return a username j.wick03', async () => {
        const mock = UserRepositoryMock([
            User.create({ username: 'a.m00', email: 'am@gmail.com'}),
            User.create({ username: 'a.m01', email: 'am1@gmail.com'}),
        ])
        usernameGenerator = new UniqueUsernameGeneratorService(mock)
        const result: Username = await usernameGenerator.generate('john', 'wick')
        expect(result.getValue()).toBe('j.wick03')
    })

}) 