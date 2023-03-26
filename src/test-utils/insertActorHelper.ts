import { graphQlCall } from "./graphQlCall"
import { mockMutations } from "./mockMutations"
import { variableValues } from "./mockVariableValues"

export async function insertActor() {
    await graphQlCall({
        source: mockMutations.createActor,
        variableValues: variableValues.actorInput
    })
}