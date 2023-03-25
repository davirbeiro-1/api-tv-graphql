import Sequelize from "sequelize/types/sequelize";
import { graphQlCall } from "../test-utils/graphQlCall";
import { testConnect } from "../test-utils/testConn";
import { faker } from '@faker-js/faker';

let conn: Sequelize
beforeAll(async () => {
    conn = await testConnect()
})

afterAll(async () => {
    await conn.close()
})

const actorMutation = `
mutation Mutation($age: String!, $name: String!) {
    createActor(age: $age, name: $name) {
      name
      age
    }
  }
`

describe('Register', () => {
    it("create actor", async () => {
        const actor = {
            age: faker.date.birthdate().toString(),
            name: faker.name.firstName()
        }
        const reponse = await graphQlCall({
            source: actorMutation,
            variableValues: actor

        })
        expect(reponse).toMatchObject({
            data: {
                createActor: {
                    age: actor.age,
                    name: actor.name
                }
            }
        })
    })
})