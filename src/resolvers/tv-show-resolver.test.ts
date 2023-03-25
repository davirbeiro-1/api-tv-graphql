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

const getAllTvShowsQuery = `query GetTvShows {
    getTvShows {
      name
    }
  }
`

const getTvByGenreQuery = `query GetTvByGenre($genre: String!) {
    getTvByGenre(genre: $genre) {
      name
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

describe('Queries', () => {
    
    it("get all tvShows", async () => {
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

        const response2 = await graphQlCall({
            source: getAllTvShowsQuery,
            variableValues: {}
        })

        expect(response2.data?.getTvShows.length).toBeGreaterThan(0)
    })

    it("get tv by genre", async () => {
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
        
        await graphQlCall({
            source: tvShowMutation,
            variableValues: tvShow

        })

        const genre = {
            genre: 'action'
        }

        const response2 = await graphQlCall({
            source: getTvByGenreQuery,
            variableValues: genre
        })

        expect(response2.data?.getTvByGenre.length).toBeGreaterThan(0)
    })

const getTvShowsByActorId = `
query Query($actorId: Float!) {
    getTvShowsByActorId(actorId: $actorId)
  }
`
    it("get actors by tv show id", async () => {
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
        console.log(response.data?.createTvShow.id)
        const teste = {
           actorId: Number("1")
        }

        const response2 = await graphQlCall({
            source: getTvShowsByActorId,
            variableValues: teste
        })
        expect(response2.data?.getTvShowsByActorId.length).toBeGreaterThan(0)
    })

})
