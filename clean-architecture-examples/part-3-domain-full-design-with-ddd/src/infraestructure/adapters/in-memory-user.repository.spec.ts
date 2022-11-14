import { InMemoryUserRepository } from "./in-memory-user.repository"
import { UserBuilder } from "../../core/domain/utils/UserBuilder"
import { User } from "../../core/domain/model/entities/User"

const build = (id: string, email: string, username: string) => User.builder()
    .id(id)
    .email(email)
    .username(username)
    .confirmed(false)
    .build()

const users = [
    build('d3aa88e2-c754-41e0-8ba6-4198a34aa0a2','fake@fake.com','j.wick0'),
    build('d3aa88e2-c754-41e0-8ba6-4198a34aa0a3','fake@fake.com','j.wick1'),
    build('d3aa88e2-c754-41e0-8ba6-4198a34aa0a4','fake@fake.com','j.mendez'),
]

describe('InMemoryUserRepository', () => {

    it('should filter 2 usernames', async () => {

        let repository = new InMemoryUserRepository(users)
        const result = await repository.findByUsernameStartWith('j.wick')
        expect(result.length).toBe(2)

    })
})