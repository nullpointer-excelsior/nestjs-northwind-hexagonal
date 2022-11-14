import { ValueObject } from "../../../shared/domain/ValueObject"

export class Username extends ValueObject<string>{

    constructor(username: string) {
        super(username, `Username ${username} doesn't follow Northiwind policies`)
    }

    /**
     * Username must be first letter of name followed by dot, lastname and number Ex: "a.smith0" or "a.smith1"
     * @param username 
     */
    validate(username: string) {
        if (!username.includes('.')) {
            return false
        }
        const split = username.split('.')
        if (split[0].length !== 1) {
            return false
        }
        return true
    }

    static createUsernameBase(firstname: string, lastname: string) {
        return `${firstname[0]}.${lastname}`
    }

    static create(firstname: string, lastname: string) {
        return new Username(`${this.createUsernameBase(firstname, lastname)}00`)
    }

    static createWithIdentity(firstname: string, lastname: string, identity: number) {
        const userNumber = String(identity).padStart(2, '0')
        return new Username(`${this.createUsernameBase(firstname, lastname)}${userNumber}`)
    }

}