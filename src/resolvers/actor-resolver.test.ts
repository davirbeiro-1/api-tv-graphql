import Sequelize from "sequelize/types/sequelize";
import { graphQlCall } from "../test-utils/graphQlCall";
import { testConnect } from "../test-utils/testConn";
import { mockMutations } from "../test-utils/mockMutations";
import { mockQueries } from "../test-utils/mockQueries";
import { variableValues } from "../test-utils/mockVariableValues";

let createActorResponse: any
let conn: Sequelize

beforeAll(async () => {
    conn = await testConnect()
    if(!createActorResponse){
        createActorResponse = await graphQlCall({
            source: mockMutations.createActor,
            variableValues: variableValues.actorInput
    
        })
    }

})

afterAll(async () => {
    await conn.close()
})

describe('Mutation tests', () => {
    it("should be create actor with success", async () => {
        expect(createActorResponse).toMatchObject({
            data: {
                createActor: {
                    age: variableValues.actorInput.age,
                    name: variableValues.actorInput.name
                }
            }
        })
    })
})

describe('Queries tests', () => {
    it("should get tv shows which an actor appears", async () => {

        variableValues.tvShowInput.actorsIds = createActorResponse.data!.createActor.id

        const createTvShowResponse = await graphQlCall({
            source: mockMutations.createTvShowMutation,
            variableValues: variableValues.tvShowInput
        })

        const tvShowId = {
            tvShowId: Number(createTvShowResponse.data!.createTvShow.id)
        }

        const getActorsByTvShowIdResponse = await graphQlCall({
            source: mockQueries.getActorsByTvShowIdQuery,
            variableValues: tvShowId
        })

        expect(getActorsByTvShowIdResponse.data?.getActorsByTvShowId.length).toBeGreaterThan(0)
        expect(getActorsByTvShowIdResponse).toMatchObject({
            data: {
                getActorsByTvShowId: [variableValues.actorInput['name']]
            }
        })
    })
})