import { buildSchema } from "type-graphql"

import {getResolvers} from './resolvers'
export async function createSchema() {
    const resolvers = getResolvers()
    return await buildSchema({ resolvers})
}