import { buildSchema } from "type-graphql"
import { ActorResolver } from "../resolvers/actor-resolver"
import { AuthResolver } from "../resolvers/auth-resolver"
import { EpisodeResolver } from "../resolvers/episode-resolver"
import { TvShowResolver } from "../resolvers/tv-show-resolver"
import { UserResolver } from "../resolvers/user-resolver"

export async function createSchema() {
    return await buildSchema({
        resolvers: [UserResolver, AuthResolver, TvShowResolver, EpisodeResolver, ActorResolver]
    })
}