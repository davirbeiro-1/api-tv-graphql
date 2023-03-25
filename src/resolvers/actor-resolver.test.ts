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
      id
    }
  }
`

const tvShowMutation = `
mutation CreateTvShow($actorsIds: [String!]!, $description: String!, $numberOfSeasons: String!, $numberOfEpisodes: String!, $genre: String!, $endsAt: String!, $startsAt: String!, $name: String!) {
    createTvShow(actorsIds: $actorsIds, description: $description, numberOfSeasons: $numberOfSeasons, numberOfEpisodes: $numberOfEpisodes, genre: $genre, endsAt: $endsAt, startsAt: $startsAt, name: $name) {
      name
      description
      id
    }
  }
`

describe('Create', () => {
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

const getActorsByTvShowIdQuery = `query Query($tvShowId: Float!) {
    getActorsByTvShowId(tvShowId: $tvShowId)
}
`
describe.only('Get', () => {
    it.only("Get tv shows which an actor appears", async () => {
        const actor = {
            age: faker.date.birthdate().toString(),
            name: faker.name.firstName()
        }
        const reponse = await graphQlCall({
            source: actorMutation,
            variableValues: actor

        })
    
        const tvShow = {
            actorsIds: [
                reponse.data!.createActor.id
            ],
            description: faker.datatype.string(6),
            numberOfSeasons: faker.datatype.float().toString(),
            numberOfEpisodes: faker.datatype.float().toString(),
            genre: "action",
            endsAt: faker.date.recent().toString(),
            startsAt: faker.date.recent().toString(),
            name: faker.name.firstName()
        }

        const reponse2 = await graphQlCall({
            source: tvShowMutation,
            variableValues: tvShow
        })

        const opa ={
            tvShowId: Number(reponse2.data!.createTvShow.id)
          }
         

        const reponse3 = await graphQlCall({
            source: getActorsByTvShowIdQuery,
            variableValues: opa
        })

        expect(reponse3.data?.getActorsByTvShowId.length).toBeGreaterThan(0)
        expect(reponse3).toMatchObject({
            data: {
                getActorsByTvShowId: [actor['name']]
            }
        })
    })
})