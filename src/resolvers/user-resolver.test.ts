import Sequelize from "sequelize/types/sequelize";
import { graphQlCall } from "../test-utils/graphQlCall";
import { testConnect } from "../test-utils/testConn";
import { faker } from '@faker-js/faker';
import { insertActor } from "../test-utils/insertActorHelper";

let conn: Sequelize
beforeAll(async () => {
    conn = await testConnect()
})

afterAll(async () => {
    await conn.close()
})

const userMutation = `
mutation RegisterUser($name: String!, $password: String!, $email: String!) {
    registerUser(name: $name, password: $password, email: $email) {
      name,
      email  
    }
  }
`

describe('Register', () => {
    it("register user", async () => {
        const user = {
            name: faker.name.firstName(),
            password: faker.internet.password(),
            email: faker.internet.email()
        }
        const response = await graphQlCall({
            source: userMutation,
            variableValues: user
        })

        expect(response).toMatchObject({
            data: {
                registerUser: {
                    name: user.name,
                    email: user.email
                }
            }
        })
    })
})
