import { graphQlCall } from "./graphQlCall"
import { mockMutations } from "./mockMutations"
import { variableValues } from "./mockVariableValues"

let createActorResponse: any
async function getCreateActorResponse() {
    if (!createActorResponse) {
        createActorResponse = await graphQlCall({
            source: mockMutations.createActor,
            variableValues: variableValues.actor
    
        })
    }
    return createActorResponse
} 

export const responseMutations = {
    createActorResponse: getCreateActorResponse(),
}