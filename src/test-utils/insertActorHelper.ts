import { faker } from "@faker-js/faker"
import { graphQlCall } from "./graphQlCall"

const actorMutation = `
mutation Mutation($age: String!, $name: String!) {
    createActor(age: $age, name: $name) {
      name
      age
    }
  }
`

export async function insertActor() {
    const actor = {
        age: faker.date.birthdate().toString(),
        name: faker.name.firstName()
    }

    await graphQlCall({
        source: actorMutation,
        variableValues: actor
    })
}