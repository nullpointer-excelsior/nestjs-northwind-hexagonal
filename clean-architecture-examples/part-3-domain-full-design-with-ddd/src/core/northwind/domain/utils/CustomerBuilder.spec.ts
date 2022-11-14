import { UUID_EXAMPLE } from "../../../../../test/utils/uuid.examples"
import { Id } from "../../../shared/domain/valueobjects/Id"
import { CustomerBuilder } from "./CustomerBuilder"

describe('CustomerBuilder', () => {

    it('shoud create a valid id', () => {
        const builder = new CustomerBuilder()

        const resultIdValue = builder
            .id(UUID_EXAMPLE)
            .build()
        expect(resultIdValue.id.getValue()).toBe(UUID_EXAMPLE)

        const resultId = builder
            .id(new Id(UUID_EXAMPLE))
            .build()
        expect(resultId.id.getValue()).toBe(UUID_EXAMPLE)

    })
})