import Sequelize from "sequelize/types/sequelize";
import { graphQlCall } from "../test-utils/graphQlCall";
import { testConnect } from "../test-utils/testConn";
import { insertActor } from "../test-utils/insertActorHelper";
import { mockMutations } from "../test-utils/mockMutations";
import { variableValues } from "../test-utils/mockVariableValues";

let conn: Sequelize
beforeAll(async () => {
    conn = await testConnect()
})

afterAll(async () => {
    await conn.close()
})

describe('Create', () => {
    it("should create episode with success", async () => {
        const tvShow = await inserTvShow()

        variableValues.episodeInput.tvShowId = Number(tvShow.data!.createTvShow.id)

        const response = await graphQlCall({
            source: mockMutations.createEpisodeMutation,
            variableValues: variableValues.episodeInput
        })

        expect(response).toMatchObject({
            data: {
                createEpisode: {
                    name: variableValues.episodeInput.name,
                }
            }
        })
    })
})

async function inserTvShow() {
    await insertActor()
    return await graphQlCall({
        source: mockMutations.createTvShowMutation,
        variableValues: variableValues.tvShowInput
    })
}

