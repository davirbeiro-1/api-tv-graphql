import Sequelize from "sequelize/types/sequelize";
import { graphQlCall } from "../test-utils/graphQlCall";
import { testConnect } from "../test-utils/testConn";
import { insertActor } from "../test-utils/insertActorHelper";
import { mockMutations } from "../test-utils/mockMutations";
import { mockQueries } from "../test-utils/mockQueries";
import { variableValues } from "../test-utils/mockVariableValues";
import { ErrorMessage } from "../utils/error-message";

let conn: Sequelize
let createTvShowResponse: any

beforeAll(async () => {
    conn = await testConnect()
    await insertActor();
    if (!createTvShowResponse) {
        createTvShowResponse = await graphQlCall({
            source: mockMutations.createTvShowMutation,
            variableValues: variableValues.tvShowInput
        })
    }
})

afterAll(async () => {
    await conn.close()
})

describe('Create', () => {
    it("should create a tvShow with sucess", async () => {
        expect(createTvShowResponse).toMatchObject({
            data: {
                createTvShow: {
                    name: variableValues.tvShowInput.name,
                    description: variableValues.tvShowInput.description
                }
            }
        })
    })
})

describe('Queries', () => {
    it("should get all tvShows with success", async () => {
        const getAllTvShowsResponse = await graphQlCall({
            source: mockQueries.getAllTvShowsQuery,
            variableValues: {}
        })
        expect(getAllTvShowsResponse.data?.getTvShows.length).toBeGreaterThan(0)
    })

    it("should return all actions tv shows with success", async () => {
        const genre = {
            genre: 'action',
            orderBy: ["description"]
        }

        const getTvShowByGenreResponse = await graphQlCall({
            source: mockQueries.getTvByGenreQuery,
            variableValues: genre
        })

        expect(getTvShowByGenreResponse.data?.getTvByGenre.length).toBeGreaterThan(0)
    })

    it("should fail when try to get tv show passing an nonexisting order param", async () => {
        const genre = {
            genre: 'action',
            orderBy: ["nonexisting_param"]
        }

        const getTvShowByGenreResponse = await graphQlCall({
            source: mockQueries.getTvByGenreQuery,
            variableValues: genre

        })

        expect(getTvShowByGenreResponse.data).toBeFalsy()
        getTvShowByGenreResponse.errors?.forEach((error) => {
            expect(error.message).toMatch(ErrorMessage.WRONG_ORDER_BY_PARAMS)
        })
    })

    

    it("should return all get actors by tv show id", async () => {
        const actorId = {
            actorId: Number("1")
        }

        const getTvShowsByActorIdResponse = await graphQlCall({
            source: mockQueries.getTvShowsByActorId,
            variableValues: actorId
        })
        
        expect(getTvShowsByActorIdResponse.data?.getTvShowsByActorId.length).toBeGreaterThan(0)
    })

    it("should fail when try to all get actors by a nonexisting tv show id", async () => {
        const actorId = {
            actorId: Number("452")
        }

        const getTvShowsByActorIdResponse = await graphQlCall({
            source: mockQueries.getTvShowsByActorId,
            variableValues: actorId
        })
        expect(getTvShowsByActorIdResponse.data).toBeFalsy()
    })
})