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

const tvShowMutation = `
mutation CreateTvShow($actorsIds: [String!]!, $description: String!, $numberOfSeasons: String!, $numberOfEpisodes: String!, $genre: String!, $endsAt: String!, $startsAt: String!, $name: String!) {
    createTvShow(actorsIds: $actorsIds, description: $description, numberOfSeasons: $numberOfSeasons, numberOfEpisodes: $numberOfEpisodes, genre: $genre, endsAt: $endsAt, startsAt: $startsAt, name: $name) {
      name,
      description
    }
  }
`

describe('Create', () => {
    it("create tvShow", async () => {
        await insertActor();
        const tvShow = {
            actorsIds: [
                "1"
            ],
            description: faker.datatype.string(6),
            numberOfSeasons: faker.datatype.float().toString(),
            numberOfEpisodes: faker.datatype.float().toString(),
            genre: "action",
            endsAt: faker.date.recent().toString(),
            startsAt: faker.date.recent().toString(),
            name: faker.name.firstName()
        }
        const response = await graphQlCall({
            source: tvShowMutation,
            variableValues: tvShow

        })

        expect(response).toMatchObject({
            data: {
                createTvShow: {
                    name: tvShow.name,
                    description: tvShow.description
                }
            }
        })
    })
})
