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
      id
    }
  }
`

const episodeMutation = `
mutation CreateEpisode($description: String!, $tvShowId: Float!, $duration: String!, $releaseDate: String!, $isReleased: Boolean!, $name: String!) {
    createEpisode(description: $description, tvShowId: $tvShowId, duration: $duration, releaseDate: $releaseDate, isReleased: $isReleased, name: $name) {
      name
    }
  }
`

describe('Create', () => {
    it("create episode", async () => {
        const tvShow = await inserTvShow()
        const episode = {
            description: faker.datatype.string(7),
            tvShowId: Number(tvShow.data!.createTvShow.id),  
            duration: faker.datatype.float().toString(),
            releaseDate: faker.date.past().toString(),
            isReleased: faker.datatype.boolean(),
            name: faker.datatype.string()
          
        }
        const response = await graphQlCall({
            source: episodeMutation,
            variableValues: episode

        })
        expect(response).toMatchObject({
            data: {
                createEpisode: {
                    name: episode.name,
                }
            }
        })
    })
})

async function inserTvShow() {
    await insertActor()
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
    return  await graphQlCall({
        source: tvShowMutation,
        variableValues: tvShow

    })
}

